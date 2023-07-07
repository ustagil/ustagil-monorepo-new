import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type UserDeletedEventMetaData = unknown;

type UserDeletedEventData = {
  id: string;
};

export class UserDeletedEvent
  implements IEvent, JSONEventType<'UserDeletedEvent', UserDeletedEventData>
{
  type = 'UserDeletedEvent' as const;
  data: UserDeletedEventData;
  metadata: UserDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
