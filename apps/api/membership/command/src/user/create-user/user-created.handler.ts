import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../user.schema';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: UserCreatedEvent) {
    const { id, ...rest } = event.data;
    const userDocument = new this.userModel({ _id: id, ...rest });
    const user = await userDocument.save();

    return user.toObject();
  }
}
