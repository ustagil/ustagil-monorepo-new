import { APIResponse, Todo, TodoGetDto, TodoListDto } from "@ustagil/typing";
import { axiosInstance } from "@ustagil/util";

export const todosList = async ({ query }: TodoListDto) =>
  (
    await axiosInstance.get<APIResponse<Todo[]>>(
      `/todos?${new URLSearchParams(query).toString()}`
    )
  ).data;

export const todosGet = async ({ params: { id }, query }: TodoGetDto) =>
  (
    await axiosInstance.get<APIResponse<Todo>>(
      `/todos/${id}?${new URLSearchParams(query).toString()}`
    )
  ).data;
