import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserKafkaCreateRequest,
  UserKafkaCreateResponse,
  UserKafkaDeleteRequest,
  UserKafkaDeleteResponse,
  UserKafkaUpdateRequest,
  UserKafkaUpdateResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { UserModel } from './user.schema';

@Controller()
export class UserController {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  @MessagePattern('user.create')
  async create(dto: UserKafkaCreateRequest): Promise<UserKafkaCreateResponse> {
    const createdUserDocument = new this.userModel(dto.body);
    const createdUser = await createdUserDocument.save();

    return createdUser.toObject();
  }

  @MessagePattern('user.update')
  async update(dto: UserKafkaUpdateRequest): Promise<UserKafkaUpdateResponse> {
    const user = await this.userModel
      .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
      .exec();

    if (!user) throw new NotFoundException();

    return user.toObject();
  }

  @MessagePattern('user.delete')
  async delete(dto: UserKafkaDeleteRequest): Promise<UserKafkaDeleteResponse> {
    const user = await this.userModel.findByIdAndRemove(dto.params.id).exec();

    if (!user) throw new NotFoundException();

    return user.toObject();
  }
}
