export type OrganizationHttpUpdateRequestParams = {
  id: string;
};

export type OrganizationHttpUpdateRequestBody = {
  name?: string;
};

export type OrganizationHttpUpdateRequest = {
  params: OrganizationHttpUpdateRequestParams;
  body: OrganizationHttpUpdateRequestBody;
};

export type OrganizationHttpUpdateResponse = undefined;
