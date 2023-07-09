import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type AccountDeletedEventMetaData = unknown;

type AccountDeletedEventData = {
  id: string;
};

export class AccountDeletedEvent
  implements
    IEvent,
    JSONEventType<'AccountDeletedEvent', AccountDeletedEventData>
{
  type = 'AccountDeletedEvent' as const;
  data: AccountDeletedEventData;
  metadata: AccountDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
