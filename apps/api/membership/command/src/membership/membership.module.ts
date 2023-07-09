import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateMembershipHandler } from './create-membership/create-membership.handler';
import { MembershipCreatedHandler } from './create-membership/membership-created.handler';
import { DeleteMembershipHandler } from './delete-membership/delete-membership.handler';
import { MembershipDeletedHandler } from './delete-membership/membership-deleted.handler';
import { MembershipController } from './membership.controller';
import { MembershipSagas } from './membership.saga';
import { MembershipModel, MembershipSchema } from './membership.schema';
import { MembershipUpdatedHandler } from './update-membership/membership-updated.handler';
import { UpdateMembershipHandler } from './update-membership/update-membership.handler';

const CommandHandlers = [
  CreateMembershipHandler,
  UpdateMembershipHandler,
  DeleteMembershipHandler,
];
const EventHandlers = [
  MembershipCreatedHandler,
  MembershipUpdatedHandler,
  MembershipDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipModel.name, schema: MembershipSchema },
    ]),
    CqrsModule,
  ],
  controllers: [MembershipController],
  providers: [MembershipSagas, ...CommandHandlers, ...EventHandlers],
})
export class MembershipModule {}
