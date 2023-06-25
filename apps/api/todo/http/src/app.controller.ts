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
import { API_TODO_COMMAND_MS, API_TODO_QUERY_MS } from '@ustagil/api-constant';
import {
  Todo,
  TodoGrpcListRequest,
  TodoGrpcReadRequest,
  TodoGrpcService,
  TodoKafkaCreateRequest,
  TodoKafkaCreateResponse,
  TodoKafkaDeleteRequest,
  TodoKafkaDeleteResponse,
  TodoKafkaUpdateRequest,
  TodoKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';

@Controller('todos')
export class AppController implements OnModuleInit {
  private todoGrpcService: TodoGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_TODO_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
    const todos = await firstValueFrom(
      this.todoGrpcService.list({ params, query }).pipe(toArray()),
    );

    return todos;
  }

  @Post()
  async create(
    @Param() params: TodoKafkaCreateRequest['params'],
    @Query() query: TodoKafkaCreateRequest['query'],
    @Body() body: TodoKafkaCreateRequest['body'],
  ): Promise<Todo> {
    const todo = await firstValueFrom(
      this.clientKafka.send<TodoKafkaCreateResponse, TodoKafkaCreateRequest>(
        'todo.create',
        { params, query, body },
      ),
    );

    if (!todo) throw new NotFoundException();

    return todo;
  }

  @Get(':id')
  async read(
    @Param() params: TodoGrpcReadRequest['params'],
    @Query() query: TodoGrpcReadRequest['query'],
  ): Promise<Todo> {
    const todo = await firstValueFrom(
      this.todoGrpcService.read({
        params,
        query,
      }),
    );

    if (!todo) throw new NotFoundException();

    return todo;
  }

  @Patch(':id')
  async update(
    @Param() params: TodoKafkaUpdateRequest['params'],
    @Body() body: TodoKafkaUpdateRequest['body'],
  ): Promise<Todo> {
    const todo = await firstValueFrom(
      this.clientKafka.send<TodoKafkaUpdateResponse, TodoKafkaUpdateRequest>(
        'todo.update',
        {
          params,
          body,
        },
      ),
    );

    if (!todo) throw new NotFoundException();

    return todo;
  }

  @Delete(':id')
  async delete(
    @Param() params: TodoKafkaDeleteRequest['params'],
  ): Promise<Todo> {
    const todo = await firstValueFrom(
      this.clientKafka.send<TodoKafkaDeleteResponse, TodoKafkaDeleteRequest>(
        'todo.delete',
        { params },
      ),
    );

    if (!todo) throw new NotFoundException();

    return todo;
  }
}
