import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  Todo,
  TodoGrpcListRequest,
  TodoGrpcListResponse,
  TodoGrpcReadRequest,
  TodoGrpcReadResponse,
} from '@ustagil/typing';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  todos: Todo[] = [
    { id: '1', name: 'name 1' },
    { id: '2', name: 'name 2' },
    { id: '3', name: 'name 3' },
  ];

  @GrpcMethod('TodoService', 'List')
  list(dto: TodoGrpcListRequest): Observable<TodoGrpcListResponse> {
    return from(this.todos);
  }

  @GrpcMethod('TodoService', 'Read')
  read(dto: TodoGrpcReadRequest): TodoGrpcReadResponse {
    return this.todos.find((e) => e.id === dto.params.id);
  }
}
