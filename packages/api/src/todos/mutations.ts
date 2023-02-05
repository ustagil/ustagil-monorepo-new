import {
  APIResponse,
  Todo,
  TodoCreateDto,
  TodoDeleteDto,
  TodoUpdateDto,
} from "@acme/typings";
import { axiosInstance } from "@acme/utils";
import { stringify } from "querystring";

export const todosCreate = async ({ query, body }: TodoCreateDto) =>
  (
    await axiosInstance.post<APIResponse<Todo>>(
      `/todos?${stringify(query)}`,
      body
    )
  ).data;

export const todosUpdate = async ({ params: { id }, body }: TodoUpdateDto) =>
  (await axiosInstance.patch<APIResponse<Todo>>(`/todos/${id}`, body)).data;

export const todosDelete = async ({ params: { id } }: TodoDeleteDto) =>
  (await axiosInstance.delete<APIResponse<Todo>>(`/todos/${id}`)).data;
