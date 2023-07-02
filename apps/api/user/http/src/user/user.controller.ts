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
  User,
  UserGrpcListRequest,
  UserGrpcReadRequest,
  UserGrpcService,
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
    @Param() params: UserGrpcListRequest['params'],
    @Query() query: UserGrpcListRequest['query'],
  ): Promise<User[]> {
    const users = await firstValueFrom(
      this.userGrpcService.list({ params, query }).pipe(toArray()),
    );

    return users;
  }

  @Post()
  create(
    @Param() params: UserKafkaCreateRequest['params'],
    @Query() query: UserKafkaCreateRequest['query'],
    @Body() body: UserKafkaCreateRequest['body'],
  ) {
    this.clientKafka.emit<UserKafkaCreateResponse, UserKafkaCreateRequest>(
      'user.create',
      { params, query, body },
    );
  }

  @Get(':id')
  async read(
    @Param() params: UserGrpcReadRequest['params'],
    @Query() query: UserGrpcReadRequest['query'],
  ): Promise<User> {
    const user = await firstValueFrom(
      this.userGrpcService.read({
        params,
        query,
      }),
    );

    if (!user) throw new NotFoundException();

    return user;
  }

  @Patch(':id')
  update(
    @Param() params: UserKafkaUpdateRequest['params'],
    @Body() body: UserKafkaUpdateRequest['body'],
  ) {
    this.clientKafka.emit<UserKafkaUpdateResponse, UserKafkaUpdateRequest>(
      'user.update',
      {
        params,
        body,
      },
    );
  }

  @Delete(':id')
  delete(@Param() params: UserKafkaDeleteRequest['params']) {
    this.clientKafka.emit<UserKafkaDeleteResponse, UserKafkaDeleteRequest>(
      'user.delete',
      { params },
    );
  }
}
