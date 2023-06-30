import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  TodoKafkaCreateRequest,
  TodoKafkaCreateResponse,
  TodoKafkaDeleteRequest,
  TodoKafkaDeleteResponse,
  TodoKafkaUpdateRequest,
  TodoKafkaUpdateResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { TodoModel } from './todo.schema';

@Controller()
export class TodoController {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  @MessagePattern('todo.create')
  async create(dto: TodoKafkaCreateRequest): Promise<TodoKafkaCreateResponse> {
    const createdTodoDocument = new this.todoModel(dto.body);
    const createdTodo = await createdTodoDocument.save();

    return createdTodo.toObject();
  }

  @MessagePattern('todo.update')
  async update(dto: TodoKafkaUpdateRequest): Promise<TodoKafkaUpdateResponse> {
    const todo = await this.todoModel
      .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
      .exec();

    if (!todo) throw new NotFoundException();

    return todo.toObject();
  }

  @MessagePattern('todo.delete')
  async delete(dto: TodoKafkaDeleteRequest): Promise<TodoKafkaDeleteResponse> {
    const todo = await this.todoModel.findByIdAndRemove(dto.params.id).exec();

    if (!todo) throw new NotFoundException();

    return todo.toObject();
  }
}
