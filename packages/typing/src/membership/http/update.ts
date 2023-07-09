export type MembershipHttpUpdateRequestParams = {
  id: string;
};

export type MembershipHttpUpdateRequestBody = {
  name?: string;
};

export type MembershipHttpUpdateRequest = {
  params: MembershipHttpUpdateRequestParams;
  body: MembershipHttpUpdateRequestBody;
};

export type MembershipHttpUpdateResponse = undefined;
