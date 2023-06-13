import { todosGet, todosList } from "@ustagil/api";
import { APIResponse, Todo, TodoGetDto, TodoListDto } from "@ustagil/typing";
import { createQuery } from "react-query-kit";

export const useTodosList = createQuery<APIResponse<Todo[]>, TodoListDto>({
  primaryKey: "todos list",
  queryFn: async ({ queryKey: [, variables] }) => await todosList(variables),
  suspense: true,
});

export const useTodosGet = createQuery<APIResponse<Todo>, TodoGetDto>({
  primaryKey: "todos get",
  queryFn: async ({ queryKey: [, variables] }) => await todosGet(variables),
  suspense: true,
});
