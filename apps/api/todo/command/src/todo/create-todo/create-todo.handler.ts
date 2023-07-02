import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoDomain } from '../todo.domain';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateTodoCommand) {
    const todo = TodoDomain.create(command.name);
    const todoDomain = this.publisher.mergeObjectContext(todo);

    todoDomain.commit();
  }
}
