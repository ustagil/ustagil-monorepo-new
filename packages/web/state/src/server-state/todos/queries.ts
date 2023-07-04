import {
  APIResponse,
  TodoHttpListRequest,
  TodoHttpListResponse,
  TodoHttpReadRequest,
  TodoHttpReadResponse,
} from "@ustagil/typing";
import { todosGet, todosList } from "@ustagil/web-api";
import { createQuery } from "react-query-kit";

export const useTodosList = createQuery<
  APIResponse<TodoHttpListResponse>,
  TodoHttpListRequest
>({
  primaryKey: "todos list",
  queryFn: async ({ queryKey: [, variables] }) => await todosList(variables),
  suspense: true,
});

export const useTodosGet = createQuery<
  APIResponse<TodoHttpReadResponse>,
  TodoHttpReadRequest
>({
  primaryKey: "todos get",
  queryFn: async ({ queryKey: [, variables] }) => await todosGet(variables),
  suspense: true,
});
