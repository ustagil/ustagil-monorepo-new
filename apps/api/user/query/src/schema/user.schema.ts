import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ collection: 'users' })
export class UserModel {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
