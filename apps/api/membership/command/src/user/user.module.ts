import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHandler } from './create-user/create-user.handler';
import { UserCreatedHandler } from './create-user/user-created.handler';
import { DeleteUserHandler } from './delete-user/delete-user.handler';
import { UserDeletedHandler } from './delete-user/user-deleted.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';
import { UserUpdatedHandler } from './update-user/user-updated.handler';
import { UserController } from './user.controller';
import { UserSagas } from './user.saga';
import { UserModel, UserSchema } from './user.schema';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
const EventHandlers = [
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [UserSagas, ...CommandHandlers, ...EventHandlers],
})
export class UserModule {}
