import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<ArticleModel>;

@Schema({ collection: 'articles' })
export class ArticleModel {
  @Prop()
  name: string;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);
