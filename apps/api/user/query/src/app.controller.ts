import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserGrpcListRequest,
  UserGrpcListResponse,
  UserGrpcReadRequest,
  UserGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { UserModel } from './schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  @GrpcMethod('UserService', 'List')
  async list(
    dto: UserGrpcListRequest,
  ): Promise<Observable<UserGrpcListResponse>> {
    const users = await this.userModel.find({ ...dto.query }).exec();
    return from(
      users.map((user) => {
        const { _id, ...q } = user.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('UserService', 'Read')
  async read(dto: UserGrpcReadRequest): Promise<UserGrpcReadResponse> {
    return (await this.userModel.findById(dto.params.id).exec()).toObject();
  }
}
