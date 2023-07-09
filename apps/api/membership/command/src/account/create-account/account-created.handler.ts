import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountModel } from '../account.schema';
import { AccountCreatedEvent } from './account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent>
{
  constructor(
    @InjectModel(AccountModel.name)
    private accountModel: Model<AccountModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: AccountCreatedEvent) {
    const { id, ...rest } = event.data;
    const accountDocument = new this.accountModel({
      _id: id,
      ...rest,
    });
    const account = await accountDocument.save();

    return account.toObject();
  }
}
