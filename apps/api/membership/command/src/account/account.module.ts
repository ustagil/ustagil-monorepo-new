import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountSagas } from './account.saga';
import { AccountModel, AccountSchema } from './account.schema';
import { AccountCreatedHandler } from './create-account/account-created.handler';
import { CreateAccountHandler } from './create-account/create-account.handler';
import { AccountDeletedHandler } from './delete-account/account-deleted.handler';
import { DeleteAccountHandler } from './delete-account/delete-account.handler';
import { AccountUpdatedHandler } from './update-account/account-updated.handler';
import { UpdateAccountHandler } from './update-account/update-account.handler';

const CommandHandlers = [
  CreateAccountHandler,
  UpdateAccountHandler,
  DeleteAccountHandler,
];
const EventHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountModel.name, schema: AccountSchema },
    ]),
    CqrsModule,
  ],
  controllers: [AccountController],
  providers: [AccountSagas, ...CommandHandlers, ...EventHandlers],
})
export class AccountModule {}
