import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type OrganizationUpdatedEventMetaData = unknown;

type OrganizationUpdatedEventData = {
  id: string;
  name?: string;
};

export class OrganizationUpdatedEvent
  implements
    IEvent,
    JSONEventType<'OrganizationUpdatedEvent', OrganizationUpdatedEventData>
{
  type = 'OrganizationUpdatedEvent' as const;
  data: OrganizationUpdatedEventData;
  metadata: OrganizationUpdatedEventMetaData = {};

  constructor(id: string, name?: string) {
    this.data = { id, name };
  }
}
