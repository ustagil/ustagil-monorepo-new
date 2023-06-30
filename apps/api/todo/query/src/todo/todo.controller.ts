import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  TodoGrpcListRequest,
  TodoGrpcListResponse,
  TodoGrpcReadRequest,
  TodoGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { TodoModel } from './todo.schema';

@Controller()
export class TodoController {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  @GrpcMethod('TodoService', 'List')
  async list(
    dto: TodoGrpcListRequest,
  ): Promise<Observable<TodoGrpcListResponse>> {
    const todos = await this.todoModel.find({ ...dto.query }).exec();
    return from(
      todos.map((todo) => {
        const { _id, ...q } = todo.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('TodoService', 'Read')
  async read(dto: TodoGrpcReadRequest): Promise<TodoGrpcReadResponse> {
    const todo = await this.todoModel.findById(dto.params.id).exec();

    if (!todo) throw new NotFoundException();

    return todo.toObject();
  }
}
