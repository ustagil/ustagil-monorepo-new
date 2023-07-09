import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { AccountCreatedEvent } from './create-account/account-created.event';
import { AccountDeletedEvent } from './delete-account/account-deleted.event';
import { AccountUpdatedEvent } from './update-account/account-updated.event';

export class AccountDomain extends AggregateRoot<
  AccountCreatedEvent | AccountDeletedEvent | AccountUpdatedEvent
> {
  private _id: string;
  private name: string;
  private deleted: boolean;

  private constructor(id: string, name: string) {
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
    const instance = new AccountDomain(
      new Types.ObjectId().toHexString(),
      name,
    );
    instance.apply(new AccountCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: AccountCreatedEvent) {
    return new AccountDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new AccountUpdatedEvent(this.id, name));
  }

  private onUpdate(event: AccountUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
  }

  delete() {
    // Business logic
    this.apply(new AccountDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: AccountDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<
        AccountCreatedEvent | AccountDeletedEvent | AccountUpdatedEvent
      >
    >,
  ): Promise<AccountDomain> {
    let accountDomainInstance!: AccountDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'AccountCreatedEvent':
          accountDomainInstance = AccountDomain.onCreate(
            new AccountCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'AccountUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          accountDomainInstance.onUpdate(
            new AccountUpdatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'AccountDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          accountDomainInstance.onDelete(
            new AccountDeletedEvent(event.data.id),
          );
          break;

        default:
          break;
      }
    }

    return accountDomainInstance;
  }
}
