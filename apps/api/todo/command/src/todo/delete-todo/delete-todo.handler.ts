import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../create-todo/todo-created.event';
import { TodoDomain } from '../todo.domain';
import { TodoUpdatedEvent } from '../update-todo/todo-updated.event';
import { DeleteTodoCommand } from './delete-todo.command';
import { TodoDeletedEvent } from './todo-deleted.event';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteTodoCommand) {
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

    todoDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'todo-' + todoDomain.id,
      todoDomain.getUncommittedEvents().map(jsonEvent),
    );

    todoDomain.commit();
  }
}
