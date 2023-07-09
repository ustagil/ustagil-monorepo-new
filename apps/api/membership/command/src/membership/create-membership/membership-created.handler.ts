import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipModel } from '../membership.schema';
import { MembershipCreatedEvent } from './membership-created.event';

@EventsHandler(MembershipCreatedEvent)
export class MembershipCreatedHandler
  implements IEventHandler<MembershipCreatedEvent>
{
  constructor(
    @InjectModel(MembershipModel.name)
    private membershipModel: Model<MembershipModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: MembershipCreatedEvent) {
    const { id, ...rest } = event.data;
    const membershipDocument = new this.membershipModel({ _id: id, ...rest });
    const membership = await membershipDocument.save();

    return membership.toObject();
  }
}
