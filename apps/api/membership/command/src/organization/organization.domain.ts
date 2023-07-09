import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { OrganizationCreatedEvent } from './create-organization/organization-created.event';
import { OrganizationDeletedEvent } from './delete-organization/organization-deleted.event';
import { OrganizationUpdatedEvent } from './update-organization/organization-updated.event';

export class OrganizationDomain extends AggregateRoot<
  OrganizationCreatedEvent | OrganizationDeletedEvent | OrganizationUpdatedEvent
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
    const instance = new OrganizationDomain(
      new Types.ObjectId().toHexString(),
      name,
    );
    instance.apply(new OrganizationCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: OrganizationCreatedEvent) {
    return new OrganizationDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new OrganizationUpdatedEvent(this.id, name));
  }

  private onUpdate(event: OrganizationUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
  }

  delete() {
    // Business logic
    this.apply(new OrganizationDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: OrganizationDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<
        | OrganizationCreatedEvent
        | OrganizationDeletedEvent
        | OrganizationUpdatedEvent
      >
    >,
  ): Promise<OrganizationDomain> {
    let organizationDomainInstance!: OrganizationDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'OrganizationCreatedEvent':
          organizationDomainInstance = OrganizationDomain.onCreate(
            new OrganizationCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'OrganizationUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          organizationDomainInstance.onUpdate(
            new OrganizationUpdatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'OrganizationDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          organizationDomainInstance.onDelete(
            new OrganizationDeletedEvent(event.data.id),
          );
          break;

        default:
          break;
      }
    }

    return organizationDomainInstance;
  }
}
