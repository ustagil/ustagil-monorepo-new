import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type UserCreatedEventMetaData = MetadataType;

type UserCreatedEventData = {
  id: string;
  name: string;
};

export class UserCreatedEvent
  implements IEvent, JSONEventType<'UserCreatedEvent', UserCreatedEventData>
{
  type = 'UserCreatedEvent' as const;
  data: UserCreatedEventData;
  metadata: UserCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
