import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  Todo,
  TodoKafkaCreateRequest,
  TodoKafkaCreateResponse,
  TodoKafkaDeleteRequest,
  TodoKafkaDeleteResponse,
  TodoKafkaUpdateRequest,
  TodoKafkaUpdateResponse,
} from '@ustagil/typing';

@Controller()
export class AppController {
  todos: Todo[] = [];

  @MessagePattern('todo.create')
  create(dto: TodoKafkaCreateRequest): TodoKafkaCreateResponse {
    const nextId = this.todos.length;
    const newTodo: Todo = { id: `${nextId}`, ...dto.body };
    this.todos.push(newTodo);
    return newTodo;
  }

  @MessagePattern('todo.update')
  update(dto: TodoKafkaUpdateRequest): TodoKafkaUpdateResponse {
    const foundIndex = this.todos.findIndex((e) => e.id === dto.params.id);
    this.todos = this.todos.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.todos[foundIndex];
  }

  @MessagePattern('todo.delete')
  delete(dto: TodoKafkaDeleteRequest): TodoKafkaDeleteResponse {
    return removeObjectWithId(this.todos, dto.params.id);
  }
}

function removeObjectWithId<T extends { id: string }>(
  arr: Array<T>,
  id: string,
): T {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    const obj = arr[objWithIdIndex];
    arr.splice(objWithIdIndex, 1);
    return obj;
  }

  return null;
}
