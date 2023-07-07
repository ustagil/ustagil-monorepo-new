import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoModel } from '../todo.schema';
import { TodoUpdatedEvent } from './todo-updated.event';

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler implements IEventHandler<TodoUpdatedEvent> {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  async handle(event: TodoUpdatedEvent) {
    const { id, ...rest } = event.data;
    const todo = await this.todoModel.findById(id).exec();

    if (!todo) throw new NotFoundException();

    await this.todoModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(todo.toObject(), rest);
  }
}
