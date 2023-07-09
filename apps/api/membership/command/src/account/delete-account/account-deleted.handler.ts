import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountModel } from '../account.schema';
import { AccountDeletedEvent } from './account-deleted.event';

@EventsHandler(AccountDeletedEvent)
export class AccountDeletedHandler
  implements IEventHandler<AccountDeletedEvent>
{
  constructor(
    @InjectModel(AccountModel.name)
    private accountModel: Model<AccountModel>,
  ) {}

  async handle(event: AccountDeletedEvent) {
    const account = await this.accountModel.findById(event.data.id).exec();

    if (!account) throw new NotFoundException();

    await this.accountModel.deleteOne({ _id: event.data.id }).exec();

    return account.toObject();
  }
}
