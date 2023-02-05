import { APIResponse, Todo, TodoGetDto, TodoListDto } from "@acme/typings";
import { axiosInstance } from "@acme/utils";
import { stringify } from "querystring";

export const todosList = async ({ query }: TodoListDto) =>
  (await axiosInstance.get<APIResponse<Todo[]>>(`/todos?${stringify(query)}`))
    .data;

export const todosGet = async ({ params: { id }, query }: TodoGetDto) =>
  (
    await axiosInstance.get<APIResponse<Todo>>(
      `/todos/${id}?${stringify(query)}`
    )
  ).data;
