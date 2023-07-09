import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipModel } from '../membership.schema';
import { MembershipDeletedEvent } from './membership-deleted.event';

@EventsHandler(MembershipDeletedEvent)
export class MembershipDeletedHandler
  implements IEventHandler<MembershipDeletedEvent>
{
  constructor(
    @InjectModel(MembershipModel.name)
    private membershipModel: Model<MembershipModel>,
  ) {}

  async handle(event: MembershipDeletedEvent) {
    const membership = await this.membershipModel
      .findById(event.data.id)
      .exec();

    if (!membership) throw new NotFoundException();

    await this.membershipModel.deleteOne({ _id: event.data.id }).exec();

    return membership.toObject();
  }
}
