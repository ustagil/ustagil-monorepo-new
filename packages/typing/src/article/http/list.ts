import { ArticleHttpResponse } from ".";

export type ArticleHttpListRequestQuery = {};

export type ArticleHttpListRequest = { query: ArticleHttpListRequestQuery };

export type ArticleHttpListResponse = ArticleHttpResponse[] | undefined | null;
