import { AccountHttpResponse } from ".";

export type AccountHttpListRequestQuery = {};

export type AccountHttpListRequest = { query: AccountHttpListRequestQuery };

export type AccountHttpListResponse = AccountHttpResponse[] | undefined | null;
