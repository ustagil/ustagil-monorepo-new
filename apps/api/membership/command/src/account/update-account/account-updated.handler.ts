import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountModel } from '../account.schema';
import { AccountUpdatedEvent } from './account-updated.event';

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler
  implements IEventHandler<AccountUpdatedEvent>
{
  constructor(
    @InjectModel(AccountModel.name)
    private accountModel: Model<AccountModel>,
  ) {}

  async handle(event: AccountUpdatedEvent) {
    const { id, ...rest } = event.data;
    const account = await this.accountModel.findById(id).exec();

    if (!account) throw new NotFoundException();

    await this.accountModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(account.toObject(), rest);
  }
}
