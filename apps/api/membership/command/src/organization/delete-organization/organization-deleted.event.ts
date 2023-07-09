import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type OrganizationDeletedEventMetaData = unknown;

type OrganizationDeletedEventData = {
  id: string;
};

export class OrganizationDeletedEvent
  implements
    IEvent,
    JSONEventType<'OrganizationDeletedEvent', OrganizationDeletedEventData>
{
  type = 'OrganizationDeletedEvent' as const;
  data: OrganizationDeletedEventData;
  metadata: OrganizationDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
