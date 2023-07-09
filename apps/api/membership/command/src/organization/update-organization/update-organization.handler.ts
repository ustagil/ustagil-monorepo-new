import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationCreatedEvent } from '../create-organization/organization-created.event';
import { OrganizationDeletedEvent } from '../delete-organization/organization-deleted.event';
import { OrganizationDomain } from '../organization.domain';
import { OrganizationUpdatedEvent } from './organization-updated.event';
import { UpdateOrganizationCommand } from './update-organization.command';

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationHandler
  implements ICommandHandler<UpdateOrganizationCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateOrganizationCommand) {
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

    organizationDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'organization-' + organizationDomain.id,
      organizationDomain.getUncommittedEvents().map(jsonEvent),
    );

    organizationDomain.commit();
  }
}
