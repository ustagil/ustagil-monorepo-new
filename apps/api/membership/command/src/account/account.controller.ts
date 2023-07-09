import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  AccountKafkaCreateRequest,
  AccountKafkaDeleteRequest,
  AccountKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateAccountCommand } from './create-account/create-account.command';
import { DeleteAccountCommand } from './delete-account/delete-account.command';
import { UpdateAccountCommand } from './update-account/update-account.command';

@Controller()
export class AccountController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('account.create')
  async create(dto: AccountKafkaCreateRequest) {
    await this.commandBus.execute(new CreateAccountCommand(dto.body.name));
  }

  @MessagePattern('account.update')
  async update(dto: AccountKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateAccountCommand(dto.params.id, dto.body.name),
    );
  }

  @MessagePattern('account.delete')
  async delete(dto: AccountKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteAccountCommand(dto.params.id));
  }
}
