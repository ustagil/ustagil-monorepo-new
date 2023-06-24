import { Controller } from '@nestjs/common';
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
import { TodoModel } from './schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
  ) {}

  @GrpcMethod('TodoService', 'List')
  async list(
    dto: TodoGrpcListRequest,
  ): Promise<Observable<TodoGrpcListResponse>> {
    const todos = await this.todoModel.find({ ...dto.query }).exec();
    // todos.
    return from(
      todos.map((todo) => {
        const { _id, ...q } = todo.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('TodoService', 'Read')
  async read(dto: TodoGrpcReadRequest): Promise<TodoGrpcReadResponse> {
    return (await this.todoModel.findById(dto.params.id).exec()).toObject();
  }
}
