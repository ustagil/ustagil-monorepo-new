import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTodoHandler } from './create-todo/create-todo.handler';
import { TodoCreatedHandler } from './create-todo/todo-created.handler';
import { DeleteTodoHandler } from './delete-todo/delete-todo.handler';
import { TodoDeletedHandler } from './delete-todo/todo-deleted.handler';
import { TodoController } from './todo.controller';
import { TodoSagas } from './todo.saga';
import { TodoModel, TodoSchema } from './todo.schema';
import { TodoUpdatedHandler } from './update-todo/todo-updated.handler';
import { UpdateTodoHandler } from './update-todo/update-todo.handler';

const CommandHandlers = [
  CreateTodoHandler,
  UpdateTodoHandler,
  DeleteTodoHandler,
];
const EventHandlers = [
  TodoCreatedHandler,
  TodoUpdatedHandler,
  TodoDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoModel.name, schema: TodoSchema }]),
    CqrsModule,
  ],
  controllers: [TodoController],
  providers: [TodoSagas, ...CommandHandlers, ...EventHandlers],
})
export class TodoModule {}
