import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type AccountCreatedEventMetaData = MetadataType;

type AccountCreatedEventData = {
  id: string;
  name: string;
};

export class AccountCreatedEvent
  implements
    IEvent,
    JSONEventType<'AccountCreatedEvent', AccountCreatedEventData>
{
  type = 'AccountCreatedEvent' as const;
  data: AccountCreatedEventData;
  metadata: AccountCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
