import { APIResponse, Todo, TodoListDto, TodoReadDto } from "@ustagil/typing";
import { todosGet, todosList } from "@ustagil/web-api";
import { createQuery } from "react-query-kit";

export const useTodosList = createQuery<APIResponse<Todo[]>, TodoListDto>({
  primaryKey: "todos list",
  queryFn: async ({ queryKey: [, variables] }) => await todosList(variables),
  suspense: true,
});

export const useTodosGet = createQuery<APIResponse<Todo>, TodoReadDto>({
  primaryKey: "todos get",
  queryFn: async ({ queryKey: [, variables] }) => await todosGet(variables),
  suspense: true,
});
