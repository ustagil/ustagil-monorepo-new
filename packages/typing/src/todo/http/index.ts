export type TodoHttpResponse = {
  _id: string;
  name: string;
};

export type TodoHttpListRequest = {
  query: Record<string, any>;
};

export type TodoHttpListResponse = TodoHttpResponse[] | undefined | null;

export type TodoHttpReadRequest = {
  params: { id: string };
};

export type TodoHttpReadResponse = TodoHttpResponse | undefined | null;

export type TodoHttpCreateRequest = {
  body: { name: string };
};

export type TodoHttpCreateResponse = undefined;

export type TodoHttpUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type TodoHttpUpdateResponse = undefined;

export type TodoHttpDeleteRequest = {
  params: { id: string };
};

export type TodoHttpDeleteResponse = undefined;
