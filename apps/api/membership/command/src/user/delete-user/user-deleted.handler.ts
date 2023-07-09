import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../user.schema';
import { UserDeletedEvent } from './user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async handle(event: UserDeletedEvent) {
    const user = await this.userModel.findById(event.data.id).exec();

    if (!user) throw new NotFoundException();

    await this.userModel.deleteOne({ _id: event.data.id }).exec();

    return user.toObject();
  }
}
