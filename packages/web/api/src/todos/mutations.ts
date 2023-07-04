import {
  APIResponse,
  TodoHttpCreateRequest,
  TodoHttpCreateResponse,
  TodoHttpDeleteRequest,
  TodoHttpDeleteResponse,
  TodoHttpUpdateRequest,
  TodoHttpUpdateResponse,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

export const todosCreate = async ({ body }: TodoHttpCreateRequest) =>
  (
    await axiosInstance.post<APIResponse<TodoHttpCreateResponse>>(
      `/todos`,
      body
    )
  ).data;

export const todosUpdate = async ({
  params: { id },
  body,
}: TodoHttpUpdateRequest) =>
  (
    await axiosInstance.patch<APIResponse<TodoHttpUpdateResponse>>(
      `/todos/${id}`,
      body
    )
  ).data;

export const todosDelete = async ({ params: { id } }: TodoHttpDeleteRequest) =>
  (
    await axiosInstance.delete<APIResponse<TodoHttpDeleteResponse>>(
      `/todos/${id}`
    )
  ).data;
