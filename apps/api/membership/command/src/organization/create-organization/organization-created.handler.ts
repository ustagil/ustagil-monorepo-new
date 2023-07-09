import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationModel } from '../organization.schema';
import { OrganizationCreatedEvent } from './organization-created.event';

@EventsHandler(OrganizationCreatedEvent)
export class OrganizationCreatedHandler
  implements IEventHandler<OrganizationCreatedEvent>
{
  constructor(
    @InjectModel(OrganizationModel.name)
    private organizationModel: Model<OrganizationModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: OrganizationCreatedEvent) {
    const { id, ...rest } = event.data;
    const organizationDocument = new this.organizationModel({
      _id: id,
      ...rest,
    });
    const organization = await organizationDocument.save();

    return organization.toObject();
  }
}
