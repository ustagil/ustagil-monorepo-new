import { Controller } from '@nestjs/common';
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
import { TodoModel } from './schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  @MessagePattern('todo.create')
  async create(dto: TodoKafkaCreateRequest): Promise<TodoKafkaCreateResponse> {
    const createdTodo = new this.todoModel(dto.body);
    return (await createdTodo.save()).toObject();
  }

  @MessagePattern('todo.update')
  async update(dto: TodoKafkaUpdateRequest): Promise<TodoKafkaUpdateResponse> {
    return (
      await this.todoModel
        .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
        .exec()
    ).toObject();
  }

  @MessagePattern('todo.delete')
  async delete(dto: TodoKafkaDeleteRequest): Promise<TodoKafkaDeleteResponse> {
    return (
      await this.todoModel.findByIdAndRemove(dto.params.id).exec()
    ).toObject();
  }
}
