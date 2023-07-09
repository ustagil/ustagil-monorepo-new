import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from '../account.domain';
import { AccountCreatedEvent } from '../create-account/account-created.event';
import { AccountUpdatedEvent } from '../update-account/account-updated.event';
import { AccountDeletedEvent } from './account-deleted.event';
import { DeleteAccountCommand } from './delete-account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteAccountCommand) {
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

    accountDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'account-' + accountDomain.id,
      accountDomain.getUncommittedEvents().map(jsonEvent),
    );

    accountDomain.commit();
  }
}
