import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type TodoCreatedEventMetaData = MetadataType;

type TodoCreatedEventData = {
  id: string;
  name: string;
};

export class TodoCreatedEvent
  implements IEvent, JSONEventType<'TodoCreatedEvent', TodoCreatedEventData>
{
  type = 'TodoCreatedEvent' as const;
  data: TodoCreatedEventData;
  metadata: TodoCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
