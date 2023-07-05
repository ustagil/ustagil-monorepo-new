import { TodoHttpResponse } from ".";

export type TodoHttpListRequestQuery = {};

export type TodoHttpListRequest = { query: TodoHttpListRequestQuery };

export type TodoHttpListResponse = TodoHttpResponse[] | undefined | null;
