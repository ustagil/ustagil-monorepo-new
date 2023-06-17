import { Injectable } from '@nestjs/common';
import {
  Todo,
  TodoCreateDto,
  TodoDeleteDto,
  TodoListDto,
  TodoReadDto,
  TodoUpdateDto,
} from '@ustagil/typing';

@Injectable()
export class AppService {
  todos: Todo[] = [];

  list(dto: TodoListDto): Todo[] {
    dto;
    return this.todos;
  }

  create(dto: TodoCreateDto): Todo {
    const nextId = this.todos.length;
    const newTodo: Todo = { id: `${nextId}`, ...dto.body };
    this.todos.push(newTodo);
    return newTodo;
  }

  read(dto: TodoReadDto): Todo {
    return this.todos.find((e) => e.name === dto.params.id);
  }

  update(dto: TodoUpdateDto): Todo {
    const foundIndex = this.todos.findIndex((e) => e.id === dto.params.id);
    this.todos = this.todos.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.todos[foundIndex];
  }

  delete(dto: TodoDeleteDto): Todo {
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
