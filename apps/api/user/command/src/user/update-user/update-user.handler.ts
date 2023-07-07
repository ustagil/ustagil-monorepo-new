import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../create-user/user-created.event';
import { UserDeletedEvent } from '../delete-user/user-deleted.event';
import { UserDomain } from '../user.domain';
import { UpdateUserCommand } from './update-user.command';
import { UserUpdatedEvent } from './user-updated.event';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateUserCommand) {
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

    userDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'user-' + userDomain.id,
      userDomain.getUncommittedEvents().map(jsonEvent),
    );

    userDomain.commit();
  }
}
