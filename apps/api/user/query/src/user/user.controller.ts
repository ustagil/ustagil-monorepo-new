import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserGrpcListRequest,
  UserGrpcListResponse,
  UserGrpcReadByUsernameRequest,
  UserGrpcReadByUsernameResponse,
  UserGrpcReadRequest,
  UserGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { UserModel } from './user.schema';

@Controller()
export class UserController {
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
    const user = await this.userModel.findById(dto.params.id).exec();

    if (!user) throw new NotFoundException();

    return user.toObject();
  }

  @GrpcMethod('UserService', 'ReadByUsername')
  async readByUsername(
    dto: UserGrpcReadByUsernameRequest,
  ): Promise<UserGrpcReadByUsernameResponse> {
    const user = await this.userModel
      .findOne({ username: dto.username })
      .exec();

    if (!user) throw new NotFoundException();

    const { _id, password, username } = user.toObject();
    return { _id: _id.toHexString(), password, username };
  }
}
