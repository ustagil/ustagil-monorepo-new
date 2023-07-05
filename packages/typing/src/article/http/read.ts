import { ArticleHttpResponse } from ".";

export type ArticleHttpReadRequestParams = {
  id: string;
};

export type ArticleHttpReadRequest = {
  params: ArticleHttpReadRequestParams;
};

export type ArticleHttpReadResponse = ArticleHttpResponse | undefined | null;
