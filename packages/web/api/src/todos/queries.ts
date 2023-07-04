import {
  APIResponse,
  TodoHttpListRequest,
  TodoHttpListResponse,
  TodoHttpReadRequest,
  TodoHttpReadResponse,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

export const todosList = async ({ query }: TodoHttpListRequest) =>
  (
    await axiosInstance.get<APIResponse<TodoHttpListResponse>>(
      `/todos?${new URLSearchParams(query).toString()}`
    )
  ).data;

export const todosGet = async ({ params: { id } }: TodoHttpReadRequest) =>
  (await axiosInstance.get<APIResponse<TodoHttpReadResponse>>(`/todos/${id}`))
    .data;
