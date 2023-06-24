import { Controller } from '@nestjs/common';
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
import { UserModel } from './schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  @MessagePattern('user.create')
  async create(dto: UserKafkaCreateRequest): Promise<UserKafkaCreateResponse> {
    const createdUser = new this.userModel(dto.body);
    return (await createdUser.save()).toObject();
  }

  @MessagePattern('user.update')
  async update(dto: UserKafkaUpdateRequest): Promise<UserKafkaUpdateResponse> {
    return (
      await this.userModel
        .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
        .exec()
    ).toObject();
  }

  @MessagePattern('user.delete')
  async delete(dto: UserKafkaDeleteRequest): Promise<UserKafkaDeleteResponse> {
    return (
      await this.userModel.findByIdAndRemove(dto.params.id).exec()
    ).toObject();
  }
}
