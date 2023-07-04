import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoDomain } from '../todo.domain';
import { UpdateTodoCommand } from './update-todo.command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: UpdateTodoCommand) {
    const todoDomain = this.publisher.mergeObjectContext(
      new TodoDomain(command.id),
    );

    todoDomain.update(command.name);
    todoDomain.commit();
  }
}
