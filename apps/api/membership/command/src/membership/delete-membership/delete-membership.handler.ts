import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MembershipCreatedEvent } from '../create-membership/membership-created.event';
import { MembershipDomain } from '../membership.domain';
import { MembershipUpdatedEvent } from '../update-membership/membership-updated.event';
import { DeleteMembershipCommand } from './delete-membership.command';
import { MembershipDeletedEvent } from './membership-deleted.event';

@CommandHandler(DeleteMembershipCommand)
export class DeleteMembershipHandler
  implements ICommandHandler<DeleteMembershipCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteMembershipCommand) {
    const events = this.eventStoreDBClient.readStream<
      MembershipCreatedEvent | MembershipUpdatedEvent | MembershipDeletedEvent
    >('membership-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const membershipDomain = this.publisher.mergeObjectContext(
      await MembershipDomain.evolveFromEvents(events),
    );

    membershipDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'membership-' + membershipDomain.id,
      membershipDomain.getUncommittedEvents().map(jsonEvent),
    );

    membershipDomain.commit();
  }
}
