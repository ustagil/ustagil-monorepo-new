import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoDomain } from '../todo.domain';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateTodoCommand) {
    const todo = TodoDomain.create(command.name);
    const todoDomain = this.publisher.mergeObjectContext(todo);

    try {
      await this.eventStoreDBClient.appendToStream(
        'todo-' + todoDomain.id,
        todoDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      todoDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
