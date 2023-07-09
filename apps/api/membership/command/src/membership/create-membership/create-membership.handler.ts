import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MembershipDomain } from '../membership.domain';
import { CreateMembershipCommand } from './create-membership.command';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateMembershipCommand) {
    const membership = MembershipDomain.create(command.name);
    const membershipDomain = this.publisher.mergeObjectContext(membership);

    try {
      await this.eventStoreDBClient.appendToStream(
        'membership-' + membershipDomain.id,
        membershipDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      membershipDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
