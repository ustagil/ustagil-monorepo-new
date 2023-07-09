import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type MembershipUpdatedEventMetaData = unknown;

type MembershipUpdatedEventData = {
  id: string;
  name?: string;
};

export class MembershipUpdatedEvent
  implements
    IEvent,
    JSONEventType<'MembershipUpdatedEvent', MembershipUpdatedEventData>
{
  type = 'MembershipUpdatedEvent' as const;
  data: MembershipUpdatedEventData;
  metadata: MembershipUpdatedEventMetaData = {};

  constructor(id: string, name?: string) {
    this.data = { id, name };
  }
}
