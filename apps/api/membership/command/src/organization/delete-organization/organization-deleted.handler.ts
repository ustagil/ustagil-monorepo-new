import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationModel } from '../organization.schema';
import { OrganizationDeletedEvent } from './organization-deleted.event';

@EventsHandler(OrganizationDeletedEvent)
export class OrganizationDeletedHandler
  implements IEventHandler<OrganizationDeletedEvent>
{
  constructor(
    @InjectModel(OrganizationModel.name)
    private organizationModel: Model<OrganizationModel>,
  ) {}

  async handle(event: OrganizationDeletedEvent) {
    const organization = await this.organizationModel
      .findById(event.data.id)
      .exec();

    if (!organization) throw new NotFoundException();

    await this.organizationModel.deleteOne({ _id: event.data.id }).exec();

    return organization.toObject();
  }
}
