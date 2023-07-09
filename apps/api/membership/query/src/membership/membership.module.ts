import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipController } from './membership.controller';
import { MembershipModel, MembershipSchema } from './membership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipModel.name, schema: MembershipSchema },
    ]),
  ],
  controllers: [MembershipController],
})
export class MembershipModule {}
