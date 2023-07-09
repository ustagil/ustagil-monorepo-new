export type UserHttpUpdateRequestParams = {
  id: string;
};

export type UserHttpUpdateRequestBody = {
  username?: string;
  password?: string;
};

export type UserHttpUpdateRequest = {
  params: UserHttpUpdateRequestParams;
  body: UserHttpUpdateRequestBody;
};

export type UserHttpUpdateResponse = undefined;
