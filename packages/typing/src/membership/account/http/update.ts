export type AccountHttpUpdateRequestParams = {
  id: string;
};

export type AccountHttpUpdateRequestBody = {
  name?: string;
};

export type AccountHttpUpdateRequest = {
  params: AccountHttpUpdateRequestParams;
  body: AccountHttpUpdateRequestBody;
};

export type AccountHttpUpdateResponse = undefined;
