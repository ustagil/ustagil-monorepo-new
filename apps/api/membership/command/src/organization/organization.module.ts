import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrganizationHandler } from './create-organization/create-organization.handler';
import { OrganizationCreatedHandler } from './create-organization/organization-created.handler';
import { DeleteOrganizationHandler } from './delete-organization/delete-organization.handler';
import { OrganizationDeletedHandler } from './delete-organization/organization-deleted.handler';
import { OrganizationController } from './organization.controller';
import { OrganizationSagas } from './organization.saga';
import { OrganizationModel, OrganizationSchema } from './organization.schema';
import { OrganizationUpdatedHandler } from './update-organization/organization-updated.handler';
import { UpdateOrganizationHandler } from './update-organization/update-organization.handler';

const CommandHandlers = [
  CreateOrganizationHandler,
  UpdateOrganizationHandler,
  DeleteOrganizationHandler,
];
const EventHandlers = [
  OrganizationCreatedHandler,
  OrganizationUpdatedHandler,
  OrganizationDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationModel.name, schema: OrganizationSchema },
    ]),
    CqrsModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationSagas, ...CommandHandlers, ...EventHandlers],
})
export class OrganizationModule {}
