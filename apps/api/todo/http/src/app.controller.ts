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
import { API_TODO_COMMAND_MS, API_TODO_QUERY_MS } from '@ustagil/api-constant';
import {
  Todo,
  TodoGrpcListRequest,
  TodoGrpcListResponse,
  TodoGrpcReadRequest,
  TodoGrpcReadResponse,
  TodoKafkaCreateRequest,
  TodoKafkaCreateResponse,
  TodoKafkaDeleteRequest,
  TodoKafkaDeleteResponse,
  TodoKafkaUpdateRequest,
  TodoKafkaUpdateResponse,
} from '@ustagil/typing';
import { Observable, firstValueFrom, toArray } from 'rxjs';

@Controller('todos')
export class AppController implements OnModuleInit {
  private todoGrpcService: TodoGrpcService;

  constructor(
    @Inject(API_TODO_QUERY_MS) private clientGrpc: ClientGrpc,
    @Inject(API_TODO_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.todoGrpcService =
      this.clientGrpc.getService<TodoGrpcService>('TodoService');

    this.clientKafka.subscribeToResponseOf('todo.create');
    this.clientKafka.subscribeToResponseOf('todo.update');
    this.clientKafka.subscribeToResponseOf('todo.delete');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Param() params: TodoGrpcListRequest['params'],
    @Query() query: TodoGrpcListRequest['query'],
  ): Promise<Todo[]> {
    return await firstValueFrom(
      this.todoGrpcService.list({ params, query }).pipe(toArray()),
    );
  }

  @Post()
  async create(
    @Param() params: TodoKafkaCreateRequest['params'],
    @Query() query: TodoKafkaCreateRequest['query'],
    @Body() body: TodoKafkaCreateRequest['body'],
  ): Promise<Todo> {
    return await firstValueFrom(
      this.clientKafka.send<TodoKafkaCreateResponse, TodoKafkaCreateRequest>(
        'todo.create',
        { params, query, body },
      ),
    );
  }

  @Get(':id')
  async read(
    @Param() params: TodoGrpcReadRequest['params'],
    @Query() query: TodoGrpcReadRequest['query'],
  ): Promise<Todo> {
    return await firstValueFrom(
      this.todoGrpcService.read({
        params,
        query,
      }),
    );
  }

  @Patch(':id')
  async update(
    @Param() params: TodoKafkaUpdateRequest['params'],
    @Body() body: TodoKafkaUpdateRequest['body'],
  ): Promise<Todo> {
    return await firstValueFrom(
      this.clientKafka.send<TodoKafkaUpdateResponse, TodoKafkaUpdateRequest>(
        'todo.update',
        {
          params,
          body,
        },
      ),
    );
  }

  @Delete(':id')
  async delete(
    @Param() params: TodoKafkaDeleteRequest['params'],
  ): Promise<Todo> {
    return await firstValueFrom(
      this.clientKafka.send<TodoKafkaDeleteResponse, TodoKafkaDeleteRequest>(
        'todo.delete',
        { params },
      ),
    );
  }
}

interface TodoGrpcService {
  list(data: TodoGrpcListRequest): Observable<TodoGrpcListResponse>;
  read(data: TodoGrpcReadRequest): Observable<TodoGrpcReadResponse>;
}
