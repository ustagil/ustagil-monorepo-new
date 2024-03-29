import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoModel } from '../todo.schema';
import { TodoDeletedEvent } from './todo-deleted.event';

@EventsHandler(TodoDeletedEvent)
export class TodoDeletedHandler implements IEventHandler<TodoDeletedEvent> {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  async handle(event: TodoDeletedEvent) {
    const todo = await this.todoModel.findById(event.data.id).exec();

    if (!todo) throw new NotFoundException();

    await this.todoModel.deleteOne({ _id: event.data.id }).exec();

    return todo.toObject();
  }
}
