import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type TodoUpdatedEventMetaData = unknown;

type TodoUpdatedEventData = {
  id: string;
  name?: string;
};

export class TodoUpdatedEvent
  implements IEvent, JSONEventType<'TodoUpdatedEvent', TodoUpdatedEventData>
{
  type = 'TodoUpdatedEvent' as const;
  data: TodoUpdatedEventData;
  metadata: TodoUpdatedEventMetaData = {};

  constructor(id: string, name?: string) {
    this.data = { id, name };
  }
}
