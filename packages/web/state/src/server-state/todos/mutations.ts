import {
  APIResponse,
  TodoHttpCreateRequest,
  TodoHttpCreateResponse,
  TodoHttpDeleteRequest,
  TodoHttpDeleteResponse,
  TodoHttpUpdateRequest,
  TodoHttpUpdateResponse,
} from "@ustagil/typing";
import { todosCreate, todosDelete, todosUpdate } from "@ustagil/web-api";
import { createMutation } from "react-query-kit";

export const useTodosCreate = createMutation<
  APIResponse<TodoHttpCreateResponse>,
  TodoHttpCreateRequest
>({
  mutationKey: ["todos", "create"],
  mutationFn: async (variables) => await todosCreate(variables),
});

export const useTodosUpdate = createMutation<
  APIResponse<TodoHttpUpdateResponse>,
  TodoHttpUpdateRequest
>({
  mutationKey: ["todos", "update"],
  mutationFn: async (variables) => await todosUpdate(variables),
});

export const useTodosDelete = createMutation<
  APIResponse<TodoHttpDeleteResponse>,
  TodoHttpDeleteRequest
>({
  mutationKey: ["todos", "delete"],
  mutationFn: async (variables) => await todosDelete(variables),
});
