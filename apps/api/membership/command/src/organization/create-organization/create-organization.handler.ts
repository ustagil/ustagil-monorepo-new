import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationDomain } from '../organization.domain';
import { CreateOrganizationCommand } from './create-organization.command';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler
  implements ICommandHandler<CreateOrganizationCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateOrganizationCommand) {
    const organization = OrganizationDomain.create(command.name);
    const organizationDomain = this.publisher.mergeObjectContext(organization);

    try {
      await this.eventStoreDBClient.appendToStream(
        'organization-' + organizationDomain.id,
        organizationDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      organizationDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
