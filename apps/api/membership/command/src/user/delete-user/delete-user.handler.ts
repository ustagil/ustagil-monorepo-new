import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../create-user/user-created.event';
import { UserUpdatedEvent } from '../update-user/user-updated.event';
import { UserDomain } from '../user.domain';
import { DeleteUserCommand } from './delete-user.command';
import { UserDeletedEvent } from './user-deleted.event';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteUserCommand) {
    const events = this.eventStoreDBClient.readStream<
      UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent
    >('user-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const userDomain = this.publisher.mergeObjectContext(
      await UserDomain.evolveFromEvents(events),
    );

    userDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'user-' + userDomain.id,
      userDomain.getUncommittedEvents().map(jsonEvent),
    );

    userDomain.commit();
  }
}
