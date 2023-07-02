import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  TodoKafkaCreateRequest,
  TodoKafkaDeleteRequest,
  TodoKafkaUpdateRequest,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { CreateTodoCommand } from './create-todo/create-todo.command';
import { DeleteTodoCommand } from './delete-todo/delete-todo.command';
import { TodoModel } from './todo.schema';
import { UpdateTodoCommand } from './update-todo/update-todo.command';

@Controller()
export class TodoController {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
    private commandBus: CommandBus,
  ) {}

  @MessagePattern('todo.create')
  async create(dto: TodoKafkaCreateRequest) {
    await this.commandBus.execute(new CreateTodoCommand(dto.body.name));
  }

  @MessagePattern('todo.update')
  async update(dto: TodoKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateTodoCommand(dto.params.id, dto.body.name),
    );
  }

  @MessagePattern('todo.delete')
  async delete(dto: TodoKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteTodoCommand(dto.params.id));
  }
}
