import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationModel } from '../organization.schema';
import { OrganizationUpdatedEvent } from './organization-updated.event';

@EventsHandler(OrganizationUpdatedEvent)
export class OrganizationUpdatedHandler
  implements IEventHandler<OrganizationUpdatedEvent>
{
  constructor(
    @InjectModel(OrganizationModel.name)
    private organizationModel: Model<OrganizationModel>,
  ) {}

  async handle(event: OrganizationUpdatedEvent) {
    const { id, ...rest } = event.data;
    const organization = await this.organizationModel.findById(id).exec();

    if (!organization) throw new NotFoundException();

    await this.organizationModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(organization.toObject(), rest);
  }
}
