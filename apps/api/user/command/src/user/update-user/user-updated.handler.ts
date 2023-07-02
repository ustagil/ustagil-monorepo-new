import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../user.schema';
import { UserUpdatedEvent } from './user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async handle({ id, ...rest }: UserUpdatedEvent) {
    console.log('Async UserUpdatedEvent, id: ' + id);

    const user = await this.userModel.findById(id).exec();

    if (!user) throw new NotFoundException();

    await this.userModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(user.toObject(), rest);
  }
}
