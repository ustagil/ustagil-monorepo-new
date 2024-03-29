import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoModel } from '../todo.schema';
import { TodoCreatedEvent } from './todo-created.event';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: TodoCreatedEvent) {
    const { id, ...rest } = event.data;
    const todoDocument = new this.todoModel({ _id: id, ...rest });
    const todo = await todoDocument.save();

    return todo.toObject();
  }
}
