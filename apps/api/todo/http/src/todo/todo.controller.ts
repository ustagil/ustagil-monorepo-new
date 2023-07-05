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
  TodoGrpcService,
  TodoHttpCreateRequestBody,
  TodoHttpCreateResponse,
  TodoHttpDeleteRequestParams,
  TodoHttpDeleteResponse,
  TodoHttpListRequestQuery,
  TodoHttpListResponse,
  TodoHttpReadRequestParams,
  TodoHttpReadResponse,
  TodoHttpUpdateRequestBody,
  TodoHttpUpdateRequestParams,
  TodoHttpUpdateResponse,
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
    @Query() query: TodoHttpListRequestQuery,
  ): Promise<TodoHttpListResponse> {
    const todos = await firstValueFrom(
      this.todoGrpcService.list({ query }).pipe(toArray()),
    );

    return todos;
  }

  @Post()
  create(@Body() body: TodoHttpCreateRequestBody): TodoHttpCreateResponse {
    this.clientKafka.emit('todo.create', { body });
  }

  @Get(':id')
  async read(
    @Param() params: TodoHttpReadRequestParams,
  ): Promise<TodoHttpReadResponse> {
    const todo = await firstValueFrom(
      this.todoGrpcService.read({
        params,
      }),
    );

    if (!todo) throw new NotFoundException();

    return todo;
  }

  @Patch(':id')
  update(
    @Param() params: TodoHttpUpdateRequestParams,
    @Body() body: TodoHttpUpdateRequestBody,
  ): TodoHttpUpdateResponse {
    this.clientKafka.emit<TodoKafkaUpdateResponse, TodoKafkaUpdateRequest>(
      'todo.update',
      {
        params,
        body,
      },
    );
  }

  @Delete(':id')
  delete(@Param() params: TodoHttpDeleteRequestParams): TodoHttpDeleteResponse {
    this.clientKafka.emit<TodoKafkaDeleteResponse, TodoKafkaDeleteRequest>(
      'todo.delete',
      { params },
    );
  }
}
