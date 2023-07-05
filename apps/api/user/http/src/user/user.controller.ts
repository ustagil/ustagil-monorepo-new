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
import { API_USER_COMMAND_MS, API_USER_QUERY_MS } from '@ustagil/api-constant';
import {
  UserGrpcService,
  UserHttpCreateRequestBody,
  UserHttpCreateResponse,
  UserHttpDeleteRequestParams,
  UserHttpDeleteResponse,
  UserHttpListRequestQuery,
  UserHttpListResponse,
  UserHttpReadRequestParams,
  UserHttpReadResponse,
  UserHttpUpdateRequestBody,
  UserHttpUpdateRequestParams,
  UserHttpUpdateResponse,
  UserKafkaCreateRequest,
  UserKafkaCreateResponse,
  UserKafkaDeleteRequest,
  UserKafkaDeleteResponse,
  UserKafkaUpdateRequest,
  UserKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';

@Controller('users')
export class UserController implements OnModuleInit {
  private userGrpcService: UserGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_USER_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_USER_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.userGrpcService =
      this.clientGrpc.getService<UserGrpcService>('UserService');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Query() query: UserHttpListRequestQuery,
  ): Promise<UserHttpListResponse> {
    const users = await firstValueFrom(
      this.userGrpcService.list({ query }).pipe(toArray()),
    );

    return users;
  }

  @Post()
  create(@Body() body: UserHttpCreateRequestBody): UserHttpCreateResponse {
    this.clientKafka.emit<UserKafkaCreateResponse, UserKafkaCreateRequest>(
      'user.create',
      { body },
    );
  }

  @Get(':id')
  async read(
    @Param() params: UserHttpReadRequestParams,
  ): Promise<UserHttpReadResponse> {
    const user = await firstValueFrom(
      this.userGrpcService.read({
        params,
      }),
    );

    if (!user) throw new NotFoundException();

    return user;
  }

  @Patch(':id')
  update(
    @Param() params: UserHttpUpdateRequestParams,
    @Body() body: UserHttpUpdateRequestBody,
  ): UserHttpUpdateResponse {
    this.clientKafka.emit<UserKafkaUpdateResponse, UserKafkaUpdateRequest>(
      'user.update',
      {
        params,
        body,
      },
    );
  }

  @Delete(':id')
  delete(@Param() params: UserHttpDeleteRequestParams): UserHttpDeleteResponse {
    this.clientKafka.emit<UserKafkaDeleteResponse, UserKafkaDeleteRequest>(
      'user.delete',
      { params },
    );
  }
}
