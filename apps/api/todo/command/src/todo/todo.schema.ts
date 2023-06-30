import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<TodoModel>;

@Schema({ collection: 'todos' })
export class TodoModel {
  @Prop()
  name: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);
