import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<OrganizationModel>;

@Schema({ collection: 'organizations' })
export class OrganizationModel {
  @Prop()
  name: string;
}

export const OrganizationSchema =
  SchemaFactory.createForClass(OrganizationModel);
