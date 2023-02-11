import { todosCreate, todosDelete, todosUpdate } from "@ustagil/api";
import {
  APIResponse,
  Todo,
  TodoCreateDto,
  TodoDeleteDto,
  TodoUpdateDto,
} from "@ustagil/typings";
import { createMutation } from "react-query-kit";

export const useTodosCreate = createMutation<APIResponse<Todo>, TodoCreateDto>({
  mutationKey: ["todos", "create"],
  mutationFn: async (variables) => await todosCreate(variables),
});

export const useTodosUpdate = createMutation<APIResponse<Todo>, TodoUpdateDto>({
  mutationKey: ["todos", "update"],
  mutationFn: async (variables) => await todosUpdate(variables),
});

export const useTodosDelete = createMutation<APIResponse<Todo>, TodoDeleteDto>({
  mutationKey: ["todos", "delete"],
  mutationFn: async (variables) => await todosDelete(variables),
});
