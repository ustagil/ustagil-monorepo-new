import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  API_MEMBERSHIP_COMMAND_MS,
  API_MEMBERSHIP_QUERY_MS,
} from '@ustagil/api-constant';
import {
  AccountGrpcService,
  AccountHttpCreateResponse,
  AccountHttpDeleteResponse,
  AccountHttpListResponse,
  AccountHttpReadResponse,
  AccountHttpUpdateResponse,
  AccountKafkaDeleteRequest,
  AccountKafkaDeleteResponse,
  AccountKafkaUpdateRequest,
  AccountKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';
import {
  AccountHttpCreateRequestBodyDto,
  AccountHttpDeleteRequestParamsDto,
  AccountHttpListRequestQueryDto,
  AccountHttpReadRequestParamsDto,
  AccountHttpUpdateRequestBodyDto,
  AccountHttpUpdateRequestParamsDto,
} from './dto';

@Controller('membership/accounts')
export class AccountController implements OnModuleInit {
  private accountGrpcService: AccountGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_MEMBERSHIP_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_MEMBERSHIP_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.accountGrpcService =
      this.clientGrpc.getService<AccountGrpcService>('AccountService');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Query() query: AccountHttpListRequestQueryDto,
  ): Promise<AccountHttpListResponse> {
    const accounts = await firstValueFrom(
      this.accountGrpcService.list({ query }).pipe(toArray()),
    );

    return accounts;
  }

  @Post()
  create(
    @Body() body: AccountHttpCreateRequestBodyDto,
  ): AccountHttpCreateResponse {
    this.clientKafka.emit('account.create', { body });
  }

  @Get(':id')
  async read(
    @Param() params: AccountHttpReadRequestParamsDto,
  ): Promise<AccountHttpReadResponse> {
    const account = await firstValueFrom(
      this.accountGrpcService.read({
        params,
      }),
    );

    if (!account) throw new NotFoundException();

    return account;
  }

  @Patch(':id')
  update(
    @Param() params: AccountHttpUpdateRequestParamsDto,
    @Body() body: AccountHttpUpdateRequestBodyDto,
  ): AccountHttpUpdateResponse {
    this.clientKafka.emit<
      AccountKafkaUpdateResponse,
      AccountKafkaUpdateRequest
    >('account.update', {
      params,
      body,
    });
  }

  @Delete(':id')
  delete(
    @Param() params: AccountHttpDeleteRequestParamsDto,
  ): AccountHttpDeleteResponse {
    this.clientKafka.emit<
      AccountKafkaDeleteResponse,
      AccountKafkaDeleteRequest
    >('account.delete', { params });
  }
}
