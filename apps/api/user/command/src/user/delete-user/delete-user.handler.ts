import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserDomain } from '../user.domain';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: DeleteUserCommand) {
    const userDomain = this.publisher.mergeObjectContext(
      new UserDomain(command.id),
    );

    userDomain.delete();
    userDomain.commit();
  }
}
