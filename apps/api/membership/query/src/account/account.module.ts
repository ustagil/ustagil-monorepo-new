import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountModel, AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountModel.name, schema: AccountSchema },
    ]),
  ],
  controllers: [AccountController],
})
export class AccountModule {}
