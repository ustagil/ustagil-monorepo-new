import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  OrganizationGrpcListRequest,
  OrganizationGrpcListResponse,
  OrganizationGrpcReadRequest,
  OrganizationGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { OrganizationModel } from './organization.schema';

@Controller()
export class OrganizationController {
  constructor(
    @InjectModel(OrganizationModel.name)
    private organizationModel: Model<OrganizationModel>,
  ) {}

  @GrpcMethod('OrganizationService', 'List')
  async list(
    dto: OrganizationGrpcListRequest,
  ): Promise<Observable<OrganizationGrpcListResponse>> {
    const organizations = await this.organizationModel
      .find({ ...dto.query })
      .exec();
    return from(
      organizations.map((organization) => {
        const { _id, ...q } = organization.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('OrganizationService', 'Read')
  async read(
    dto: OrganizationGrpcReadRequest,
  ): Promise<OrganizationGrpcReadResponse> {
    const organization = await this.organizationModel
      .findById(dto.params.id)
      .exec();

    if (!organization) throw new NotFoundException();

    return organization.toObject();
  }
}
