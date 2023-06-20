import { APIResponse, Todo, TodoListDto, TodoReadDto } from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

export const todosList = async ({ query }: TodoListDto) =>
  (
    await axiosInstance.get<APIResponse<Todo[]>>(
      `/todos?${new URLSearchParams(query).toString()}`
    )
  ).data;

export const todosGet = async ({ params: { id }, query }: TodoReadDto) =>
  (
    await axiosInstance.get<APIResponse<Todo>>(
      `/todos/${id}?${new URLSearchParams(query).toString()}`
    )
  ).data;
