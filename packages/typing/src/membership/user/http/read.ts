import { UserHttpResponse } from ".";

export type UserHttpReadRequestParams = {
  id: string;
};

export type UserHttpReadRequest = {
  params: UserHttpReadRequestParams;
};

export type UserHttpReadResponse = UserHttpResponse | undefined | null;
