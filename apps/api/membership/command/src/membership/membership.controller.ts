import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  MembershipKafkaCreateRequest,
  MembershipKafkaDeleteRequest,
  MembershipKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateMembershipCommand } from './create-membership/create-membership.command';
import { DeleteMembershipCommand } from './delete-membership/delete-membership.command';
import { UpdateMembershipCommand } from './update-membership/update-membership.command';

@Controller()
export class MembershipController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('membership.create')
  async create(dto: MembershipKafkaCreateRequest) {
    await this.commandBus.execute(new CreateMembershipCommand(dto.body.name));
  }

  @MessagePattern('membership.update')
  async update(dto: MembershipKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateMembershipCommand(dto.params.id, dto.body.name),
    );
  }

  @MessagePattern('membership.delete')
  async delete(dto: MembershipKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteMembershipCommand(dto.params.id));
  }
}
