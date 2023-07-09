import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  OrganizationKafkaCreateRequest,
  OrganizationKafkaDeleteRequest,
  OrganizationKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateOrganizationCommand } from './create-organization/create-organization.command';
import { DeleteOrganizationCommand } from './delete-organization/delete-organization.command';
import { UpdateOrganizationCommand } from './update-organization/update-organization.command';

@Controller()
export class OrganizationController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('organization.create')
  async create(dto: OrganizationKafkaCreateRequest) {
    await this.commandBus.execute(new CreateOrganizationCommand(dto.body.name));
  }

  @MessagePattern('organization.update')
  async update(dto: OrganizationKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateOrganizationCommand(dto.params.id, dto.body.name),
    );
  }

  @MessagePattern('organization.delete')
  async delete(dto: OrganizationKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteOrganizationCommand(dto.params.id));
  }
}
