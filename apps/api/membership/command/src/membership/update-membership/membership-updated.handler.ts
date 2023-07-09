import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipModel } from '../membership.schema';
import { MembershipUpdatedEvent } from './membership-updated.event';

@EventsHandler(MembershipUpdatedEvent)
export class MembershipUpdatedHandler
  implements IEventHandler<MembershipUpdatedEvent>
{
  constructor(
    @InjectModel(MembershipModel.name)
    private membershipModel: Model<MembershipModel>,
  ) {}

  async handle(event: MembershipUpdatedEvent) {
    const { id, ...rest } = event.data;
    const membership = await this.membershipModel.findById(id).exec();

    if (!membership) throw new NotFoundException();

    await this.membershipModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(membership.toObject(), rest);
  }
}
