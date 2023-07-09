import { MembershipHttpResponse } from ".";

export type MembershipHttpListRequestQuery = {};

export type MembershipHttpListRequest = {
  query: MembershipHttpListRequestQuery;
};

export type MembershipHttpListResponse =
  | MembershipHttpResponse[]
  | undefined
  | null;
