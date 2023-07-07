import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../create-todo/todo-created.event';
import { TodoDeletedEvent } from '../delete-todo/todo-deleted.event';
import { TodoDomain } from '../todo.domain';
import { TodoUpdatedEvent } from './todo-updated.event';
import { UpdateTodoCommand } from './update-todo.command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateTodoCommand) {
    const events = this.eventStoreDBClient.readStream<
      TodoCreatedEvent | TodoUpdatedEvent | TodoDeletedEvent
    >('todo-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const todoDomain = this.publisher.mergeObjectContext(
      await TodoDomain.evolveFromEvents(events),
    );

    todoDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'todo-' + todoDomain.id,
      todoDomain.getUncommittedEvents().map(jsonEvent),
    );

    todoDomain.commit();
  }
}
