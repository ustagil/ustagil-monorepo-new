import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type MembershipCreatedEventMetaData = MetadataType;

type MembershipCreatedEventData = {
  id: string;
  name: string;
};

export class MembershipCreatedEvent
  implements
    IEvent,
    JSONEventType<'MembershipCreatedEvent', MembershipCreatedEventData>
{
  type = 'MembershipCreatedEvent' as const;
  data: MembershipCreatedEventData;
  metadata: MembershipCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
