import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserDomain } from '../user.domain';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    const user = UserDomain.create(command.name);
    const userDomain = this.publisher.mergeObjectContext(user);

    userDomain.commit();
  }
}
