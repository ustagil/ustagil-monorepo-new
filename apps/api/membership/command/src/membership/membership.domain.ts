import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { MembershipCreatedEvent } from './create-membership/membership-created.event';
import { MembershipDeletedEvent } from './delete-membership/membership-deleted.event';
import { MembershipUpdatedEvent } from './update-membership/membership-updated.event';

export class MembershipDomain extends AggregateRoot<
  MembershipCreatedEvent | MembershipDeletedEvent | MembershipUpdatedEvent
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
    const instance = new MembershipDomain(
      new Types.ObjectId().toHexString(),
      name,
    );
    instance.apply(new MembershipCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: MembershipCreatedEvent) {
    return new MembershipDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new MembershipUpdatedEvent(this.id, name));
  }

  private onUpdate(event: MembershipUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
  }

  delete() {
    // Business logic
    this.apply(new MembershipDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: MembershipDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<
        MembershipCreatedEvent | MembershipDeletedEvent | MembershipUpdatedEvent
      >
    >,
  ): Promise<MembershipDomain> {
    let membershipDomainInstance!: MembershipDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'MembershipCreatedEvent':
          membershipDomainInstance = MembershipDomain.onCreate(
            new MembershipCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'MembershipUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          membershipDomainInstance.onUpdate(
            new MembershipUpdatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'MembershipDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          membershipDomainInstance.onDelete(
            new MembershipDeletedEvent(event.data.id),
          );
          break;

        default:
          break;
      }
    }

    return membershipDomainInstance;
  }
}
