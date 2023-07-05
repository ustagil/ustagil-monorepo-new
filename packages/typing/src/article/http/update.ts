export type ArticleHttpUpdateRequestParams = {
  id: string;
};

export type ArticleHttpUpdateRequestBody = {
  name?: string;
};

export type ArticleHttpUpdateRequest = {
  params: ArticleHttpUpdateRequestParams;
  body: ArticleHttpUpdateRequestBody;
};

export type ArticleHttpUpdateResponse = undefined;
