import {
  APIResponse,
  Todo,
  TodoCreateDto,
  TodoDeleteDto,
  TodoUpdateDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

export const todosCreate = async ({ query, body }: TodoCreateDto) =>
  (
    await axiosInstance.post<APIResponse<Todo>>(
      `/todos?${new URLSearchParams(query).toString()}`,
      body
    )
  ).data;

export const todosUpdate = async ({ params: { id }, body }: TodoUpdateDto) =>
  (await axiosInstance.patch<APIResponse<Todo>>(`/todos/${id}`, body)).data;

export const todosDelete = async ({ params: { id } }: TodoDeleteDto) =>
  (await axiosInstance.delete<APIResponse<Todo>>(`/todos/${id}`)).data;
