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
  TodoKafkaDeleteRequest,
  TodoKafkaDeleteResponse,
  TodoKafkaUpdateRequest,
  TodoKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';

@Controller('todos')
export class TodoController implements OnModuleInit {
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
  create(
    @Param() params: TodoKafkaCreateRequest['params'],
    @Query() query: TodoKafkaCreateRequest['query'],
    @Body() body: TodoKafkaCreateRequest['body'],
  ) {
    this.clientKafka.emit('todo.create', { params, query, body });
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
  update(
    @Param() params: TodoKafkaUpdateRequest['params'],
    @Body() body: TodoKafkaUpdateRequest['body'],
  ) {
    this.clientKafka.emit<TodoKafkaUpdateResponse, TodoKafkaUpdateRequest>(
      'todo.update',
      {
        params,
        body,
      },
    );
  }

  @Delete(':id')
  delete(@Param() params: TodoKafkaDeleteRequest['params']) {
    this.clientKafka.emit<TodoKafkaDeleteResponse, TodoKafkaDeleteRequest>(
      'todo.delete',
      { params },
    );
  }
}
