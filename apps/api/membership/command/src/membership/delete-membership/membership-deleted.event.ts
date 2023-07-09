import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type MembershipDeletedEventMetaData = unknown;

type MembershipDeletedEventData = {
  id: string;
};

export class MembershipDeletedEvent
  implements
    IEvent,
    JSONEventType<'MembershipDeletedEvent', MembershipDeletedEventData>
{
  type = 'MembershipDeletedEvent' as const;
  data: MembershipDeletedEventData;
  metadata: MembershipDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
