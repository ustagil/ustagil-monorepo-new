import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from '../account.domain';
import { AccountCreatedEvent } from '../create-account/account-created.event';
import { AccountDeletedEvent } from '../delete-account/account-deleted.event';
import { AccountUpdatedEvent } from './account-updated.event';
import { UpdateAccountCommand } from './update-account.command';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateAccountCommand) {
    const events = this.eventStoreDBClient.readStream<
      AccountCreatedEvent | AccountUpdatedEvent | AccountDeletedEvent
    >('account-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const accountDomain = this.publisher.mergeObjectContext(
      await AccountDomain.evolveFromEvents(events),
    );

    accountDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'account-' + accountDomain.id,
      accountDomain.getUncommittedEvents().map(jsonEvent),
    );

    accountDomain.commit();
  }
}
