import { todosGet, todosList } from "@acme/api";
import { APIResponse, Todo, TodoGetDto, TodoListDto } from "@acme/typings";
import { createQuery } from "react-query-kit";

export const useTodosList = createQuery<APIResponse<Todo[]>, TodoListDto>({
  primaryKey: "todos list",
  queryFn: async ({ queryKey: [_, variables] }) => await todosList(variables),
  suspense: true,
});

export const useTodosGet = createQuery<APIResponse<Todo>, TodoGetDto>({
  primaryKey: "todos get",
  queryFn: async ({ queryKey: [_, variables] }) => await todosGet(variables),
  suspense: true,
});
