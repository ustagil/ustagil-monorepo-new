import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from '../account.domain';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateAccountCommand) {
    const account = AccountDomain.create(command.name);
    const accountDomain = this.publisher.mergeObjectContext(account);

    try {
      await this.eventStoreDBClient.appendToStream(
        'account-' + accountDomain.id,
        accountDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      accountDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
