import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type UserCreatedEventMetaData = MetadataType;

type UserCreatedEventData = {
  id: string;
  username: string;
  password: string;
};

export class UserCreatedEvent
  implements IEvent, JSONEventType<'UserCreatedEvent', UserCreatedEventData>
{
  type = 'UserCreatedEvent' as const;
  data: UserCreatedEventData;
  metadata: UserCreatedEventMetaData = {};

  constructor(id: string, username: string, password: string) {
    this.data = { id, username, password };
  }
}
