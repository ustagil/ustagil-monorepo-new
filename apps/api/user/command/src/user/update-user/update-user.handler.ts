import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserDomain } from '../user.domain';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: UpdateUserCommand) {
    const userDomain = this.publisher.mergeObjectContext(
      new UserDomain(command.id),
    );

    userDomain.update(command.name);
    userDomain.commit();
  }
}
