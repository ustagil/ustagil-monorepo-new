import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type UserUpdatedEventMetaData = unknown;

type UserUpdatedEventData = {
  id: string;
  username?: string;
  password?: string;
};

export class UserUpdatedEvent
  implements IEvent, JSONEventType<'UserUpdatedEvent', UserUpdatedEventData>
{
  type = 'UserUpdatedEvent' as const;
  data: UserUpdatedEventData;
  metadata: UserUpdatedEventMetaData = {};

  constructor(id: string, username?: string, password?: string) {
    this.data = { id, username, password };
  }
}
