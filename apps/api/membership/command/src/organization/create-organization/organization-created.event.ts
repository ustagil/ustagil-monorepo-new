import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type OrganizationCreatedEventMetaData = MetadataType;

type OrganizationCreatedEventData = {
  id: string;
  name: string;
};

export class OrganizationCreatedEvent
  implements
    IEvent,
    JSONEventType<'OrganizationCreatedEvent', OrganizationCreatedEventData>
{
  type = 'OrganizationCreatedEvent' as const;
  data: OrganizationCreatedEventData;
  metadata: OrganizationCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
