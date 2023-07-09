import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  UserKafkaCreateRequest,
  UserKafkaDeleteRequest,
  UserKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateUserCommand } from './create-user/create-user.command';
import { DeleteUserCommand } from './delete-user/delete-user.command';
import { UpdateUserCommand } from './update-user/update-user.command';

@Controller()
export class UserController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('user.create')
  async create(dto: UserKafkaCreateRequest) {
    await this.commandBus.execute(
      new CreateUserCommand(dto.body.username, dto.body.password),
    );
  }

  @MessagePattern('user.update')
  async update(dto: UserKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateUserCommand(
        dto.params.id,
        dto.body.username,
        dto.body.password,
      ),
    );
  }

  @MessagePattern('user.delete')
  async delete(dto: UserKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteUserCommand(dto.params.id));
  }
}
