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
  private name: string;
  private deleted: boolean;

  private constructor(id: string, name = '') {
    super();
    this.id = id;
    this.name = name;
    this.deleted = false;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  static create(name: string) {
    // Business logic
    const instance = new UserDomain(new Types.ObjectId().toHexString(), name);
    instance.apply(new UserCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: UserCreatedEvent) {
    return new UserDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new UserUpdatedEvent(this.id, name));
  }

  private onUpdate(event: UserUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
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
            new UserCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'UserUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userDomainInstance.onUpdate(
            new UserUpdatedEvent(event.data.id, event.data.name),
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
