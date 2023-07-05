export type TodoHttpUpdateRequestParams = {
  id: string;
};

export type TodoHttpUpdateRequestBody = {
  name?: string;
};

export type TodoHttpUpdateRequest = {
  params: TodoHttpUpdateRequestParams;
  body: TodoHttpUpdateRequestBody;
};

export type TodoHttpUpdateResponse = undefined;
