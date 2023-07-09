import { MembershipHttpResponse } from ".";

export type MembershipHttpReadRequestParams = {
  id: string;
};

export type MembershipHttpReadRequest = {
  params: MembershipHttpReadRequestParams;
};

export type MembershipHttpReadResponse =
  | MembershipHttpResponse
  | undefined
  | null;
