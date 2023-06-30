import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoModel, TodoSchema } from './todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoModel.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [],
})
export class TodoModule {}
