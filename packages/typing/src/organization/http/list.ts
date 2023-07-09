import { OrganizationHttpResponse } from ".";

export type OrganizationHttpListRequestQuery = {};

export type OrganizationHttpListRequest = {
  query: OrganizationHttpListRequestQuery;
};

export type OrganizationHttpListResponse =
  | OrganizationHttpResponse[]
  | undefined
  | null;
