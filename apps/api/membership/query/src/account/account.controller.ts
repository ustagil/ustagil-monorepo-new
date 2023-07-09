import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  AccountGrpcListRequest,
  AccountGrpcListResponse,
  AccountGrpcReadRequest,
  AccountGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { AccountModel } from './account.schema';

@Controller()
export class AccountController {
  constructor(
    @InjectModel(AccountModel.name)
    private accountModel: Model<AccountModel>,
  ) {}

  @GrpcMethod('AccountService', 'List')
  async list(
    dto: AccountGrpcListRequest,
  ): Promise<Observable<AccountGrpcListResponse>> {
    const accounts = await this.accountModel.find({ ...dto.query }).exec();
    return from(
      accounts.map((account) => {
        const { _id, ...q } = account.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('AccountService', 'Read')
  async read(dto: AccountGrpcReadRequest): Promise<AccountGrpcReadResponse> {
    const account = await this.accountModel.findById(dto.params.id).exec();

    if (!account) throw new NotFoundException();

    return account.toObject();
  }
}
