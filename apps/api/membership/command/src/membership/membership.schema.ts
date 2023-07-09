import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MembershipDocument = HydratedDocument<MembershipModel>;

@Schema({ collection: 'memberships' })
export class MembershipModel {
  @Prop()
  name: string;
}

export const MembershipSchema = SchemaFactory.createForClass(MembershipModel);
