import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  MembershipGrpcListRequest,
  MembershipGrpcListResponse,
  MembershipGrpcReadRequest,
  MembershipGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { MembershipModel } from './membership.schema';

@Controller()
export class MembershipController {
  constructor(
    @InjectModel(MembershipModel.name)
    private membershipModel: Model<MembershipModel>,
  ) {}

  @GrpcMethod('MembershipService', 'List')
  async list(
    dto: MembershipGrpcListRequest,
  ): Promise<Observable<MembershipGrpcListResponse>> {
    const memberships = await this.membershipModel
      .find({ ...dto.query })
      .exec();
    return from(
      memberships.map((membership) => {
        const { _id, ...q } = membership.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('MembershipService', 'Read')
  async read(
    dto: MembershipGrpcReadRequest,
  ): Promise<MembershipGrpcReadResponse> {
    const membership = await this.membershipModel
      .findById(dto.params.id)
      .exec();

    if (!membership) throw new NotFoundException();

    return membership.toObject();
  }
}
