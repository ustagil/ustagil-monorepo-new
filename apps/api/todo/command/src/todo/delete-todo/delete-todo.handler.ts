import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoDomain } from '../todo.domain';
import { DeleteTodoCommand } from './delete-todo.command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: DeleteTodoCommand) {
    const todoDomain = this.publisher.mergeObjectContext(
      new TodoDomain(command.id),
    );

    todoDomain.delete();
    todoDomain.commit();
  }
}
