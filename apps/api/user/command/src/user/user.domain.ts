import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { UserCreatedEvent } from './create-user/user-created.event';
import { UserDeletedEvent } from './delete-user/user-deleted.event';
import { UserUpdatedEvent } from './update-user/user-updated.event';

export class UserDomain extends AggregateRoot<
  UserCreatedEvent | UserDeletedEvent | UserUpdatedEvent
> {
  private _id: string;
  private username: string;
  private password: string;
  private deleted: boolean;

  private constructor(id: string, username: string, password: string) {
    super();
    this.id = id;
    this.username = username;
    this.password = password;
    this.deleted = false;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  static create(username: string, password: string) {
    // Business logic
    const instance = new UserDomain(
      new Types.ObjectId().toHexString(),
      username,
      password,
    );
    instance.apply(
      new UserCreatedEvent(instance.id, instance.username, instance.password),
    );
    return instance;
  }

  private static onCreate(event: UserCreatedEvent) {
    return new UserDomain(
      event.data.id,
      event.data.username,
      event.data.password,
    );
  }

  update(username?: string, password?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new UserUpdatedEvent(this.id, username, password));
  }

  private onUpdate(event: UserUpdatedEvent) {
    this.id = event.data.id;
    event.data.username && (this.username = event.data.username);
    event.data.password && (this.password = event.data.password);
  }

  delete() {
    // Business logic
    this.apply(new UserDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: UserDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<UserCreatedEvent | UserDeletedEvent | UserUpdatedEvent>
    >,
  ): Promise<UserDomain> {
    let userDomainInstance!: UserDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'UserCreatedEvent':
          userDomainInstance = UserDomain.onCreate(
            new UserCreatedEvent(
              event.data.id,
              event.data.username,
              event.data.password,
            ),
          );
          break;

        case 'UserUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userDomainInstance.onUpdate(
            new UserUpdatedEvent(
              event.data.id,
              event.data.username,
              event.data.password,
            ),
          );
          break;

        case 'UserDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userDomainInstance.onDelete(new UserDeletedEvent(event.data.id));
          break;

        default:
          break;
      }
    }

    return userDomainInstance;
  }
}
