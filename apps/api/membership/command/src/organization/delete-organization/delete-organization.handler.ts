import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationCreatedEvent } from '../create-organization/organization-created.event';
import { OrganizationDomain } from '../organization.domain';
import { OrganizationUpdatedEvent } from '../update-organization/organization-updated.event';
import { DeleteOrganizationCommand } from './delete-organization.command';
import { OrganizationDeletedEvent } from './organization-deleted.event';

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationHandler
  implements ICommandHandler<DeleteOrganizationCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteOrganizationCommand) {
    const events = this.eventStoreDBClient.readStream<
      | OrganizationCreatedEvent
      | OrganizationUpdatedEvent
      | OrganizationDeletedEvent
    >('organization-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const organizationDomain = this.publisher.mergeObjectContext(
      await OrganizationDomain.evolveFromEvents(events),
    );

    organizationDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'organization-' + organizationDomain.id,
      organizationDomain.getUncommittedEvents().map(jsonEvent),
    );

    organizationDomain.commit();
  }
}
