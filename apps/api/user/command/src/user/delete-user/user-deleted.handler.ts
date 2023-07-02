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
    console.log('Async UserDeletedEvent, id: ' + event.id);

    const user = await this.userModel.findById(event.id).exec();

    if (!user) throw new NotFoundException();

    await this.userModel.deleteOne({ _id: event.id }).exec();

    return user.toObject();
  }
}
