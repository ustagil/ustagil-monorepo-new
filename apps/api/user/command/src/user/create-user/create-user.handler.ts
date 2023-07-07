import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserDomain } from '../user.domain';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = UserDomain.create(command.username, command.password);
    const userDomain = this.publisher.mergeObjectContext(user);

    try {
      await this.eventStoreDBClient.appendToStream(
        'user-' + userDomain.id,
        userDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      userDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
