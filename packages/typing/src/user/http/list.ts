import { UserHttpResponse } from ".";

export type UserHttpListRequestQuery = {};

export type UserHttpListRequest = {
  query: UserHttpListRequestQuery;
};

export type UserHttpListResponse = UserHttpResponse[] | undefined | null;
