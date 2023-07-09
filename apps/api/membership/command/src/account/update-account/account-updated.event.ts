import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type AccountUpdatedEventMetaData = unknown;

type AccountUpdatedEventData = {
  id: string;
  name?: string;
};

export class AccountUpdatedEvent
  implements
    IEvent,
    JSONEventType<'AccountUpdatedEvent', AccountUpdatedEventData>
{
  type = 'AccountUpdatedEvent' as const;
  data: AccountUpdatedEventData;
  metadata: AccountUpdatedEventMetaData = {};

  constructor(id: string, name?: string) {
    this.data = { id, name };
  }
}
