import { AccountHttpResponse } from ".";

export type AccountHttpReadRequestParams = {
  id: string;
};

export type AccountHttpReadRequest = {
  params: AccountHttpReadRequestParams;
};

export type AccountHttpReadResponse = AccountHttpResponse | undefined | null;
