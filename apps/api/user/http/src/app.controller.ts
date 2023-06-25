import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
export class AppController implements OnModuleInit {
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

    this.clientKafka.subscribeToResponseOf('user.create');
    this.clientKafka.subscribeToResponseOf('user.update');
    this.clientKafka.subscribeToResponseOf('user.delete');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Param() params: UserGrpcListRequest['params'],
    @Query() query: UserGrpcListRequest['query'],
  ): Promise<User[]> {
    return await firstValueFrom(
      this.userGrpcService.list({ params, query }).pipe(toArray()),
    );
  }

  @Post()
  async create(
    @Param() params: UserKafkaCreateRequest['params'],
    @Query() query: UserKafkaCreateRequest['query'],
    @Body() body: UserKafkaCreateRequest['body'],
  ): Promise<User> {
    return await firstValueFrom(
      this.clientKafka.send<UserKafkaCreateResponse, UserKafkaCreateRequest>(
        'user.create',
        { params, query, body },
      ),
    );
  }

  @Get(':id')
  async read(
    @Param() params: UserGrpcReadRequest['params'],
    @Query() query: UserGrpcReadRequest['query'],
  ): Promise<User> {
    console.log('user, http, read, params: ', params);

    return await firstValueFrom(
      this.userGrpcService.read({
        params,
        query,
      }),
    );
  }

  @Patch(':id')
  async update(
    @Param() params: UserKafkaUpdateRequest['params'],
    @Body() body: UserKafkaUpdateRequest['body'],
  ): Promise<User> {
    return await firstValueFrom(
      this.clientKafka.send<UserKafkaUpdateResponse, UserKafkaUpdateRequest>(
        'user.update',
        {
          params,
          body,
        },
      ),
    );
  }

  @Delete(':id')
  async delete(
    @Param() params: UserKafkaDeleteRequest['params'],
  ): Promise<User> {
    return await firstValueFrom(
      this.clientKafka.send<UserKafkaDeleteResponse, UserKafkaDeleteRequest>(
        'user.delete',
        { params },
      ),
    );
  }
}
