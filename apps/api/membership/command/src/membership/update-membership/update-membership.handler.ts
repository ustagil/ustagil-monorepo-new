import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MembershipCreatedEvent } from '../create-membership/membership-created.event';
import { MembershipDeletedEvent } from '../delete-membership/membership-deleted.event';
import { MembershipDomain } from '../membership.domain';
import { MembershipUpdatedEvent } from './membership-updated.event';
import { UpdateMembershipCommand } from './update-membership.command';

@CommandHandler(UpdateMembershipCommand)
export class UpdateMembershipHandler
  implements ICommandHandler<UpdateMembershipCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateMembershipCommand) {
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

    membershipDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'membership-' + membershipDomain.id,
      membershipDomain.getUncommittedEvents().map(jsonEvent),
    );

    membershipDomain.commit();
  }
}
