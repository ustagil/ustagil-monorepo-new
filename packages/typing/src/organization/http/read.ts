import { OrganizationHttpResponse } from ".";

export type OrganizationHttpReadRequestParams = {
  id: string;
};

export type OrganizationHttpReadRequest = {
  params: OrganizationHttpReadRequestParams;
};

export type OrganizationHttpReadResponse =
  | OrganizationHttpResponse
  | undefined
  | null;
