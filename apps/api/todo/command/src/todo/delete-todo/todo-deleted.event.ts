import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type TodoDeletedEventMetaData = unknown;

type TodoDeletedEventData = {
  id: string;
};

export class TodoDeletedEvent
  implements IEvent, JSONEventType<'TodoDeletedEvent', TodoDeletedEventData>
{
  type = 'TodoDeletedEvent' as const;
  data: TodoDeletedEventData;
  metadata: TodoDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
