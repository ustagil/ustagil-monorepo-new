import { TodoHttpResponse } from ".";

export type TodoHttpReadRequestParams = {
  id: string;
};

export type TodoHttpReadRequest = {
  params: TodoHttpReadRequestParams;
};

export type TodoHttpReadResponse = TodoHttpResponse | undefined | null;
