export type UserHttpResponse = {
  _id: string;
  username: string;
};

export type UserHttpListRequest = {
  query: object;
};

export type UserHttpListResponse = UserHttpResponse[] | undefined | null;

export type UserHttpReadRequest = {
  params: { id: string };
};

export type UserHttpReadResponse = UserHttpResponse | undefined | null;

export type UserHttpCreateRequest = {
  body: { username: string; password: string };
};

export type UserHttpCreateResponse = undefined;

export type UserHttpUpdateRequest = {
  params: { id: string };
  body: { username?: string; password?: string };
};

export type UserHttpUpdateResponse = undefined;

export type UserHttpDeleteRequest = {
  params: { id: string };
};

export type UserHttpDeleteResponse = undefined;
