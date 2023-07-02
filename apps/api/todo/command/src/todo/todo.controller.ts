import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  TodoKafkaCreateRequest,
  TodoKafkaDeleteRequest,
  TodoKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateTodoCommand } from './create-todo/create-todo.command';
import { DeleteTodoCommand } from './delete-todo/delete-todo.command';
import { UpdateTodoCommand } from './update-todo/update-todo.command';

@Controller()
export class TodoController {
  constructor(private commandBus: CommandBus) {}

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
