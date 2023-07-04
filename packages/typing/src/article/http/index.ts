export type ArticleHttpResponse = {
  _id: string;
  name: string;
};

export type ArticleHttpListRequest = {
  query: object;
};

export type ArticleHttpListResponse = ArticleHttpResponse[] | undefined | null;

export type ArticleHttpReadRequest = {
  params: { id: string };
};

export type ArticleHttpReadResponse = ArticleHttpResponse | undefined | null;

export type ArticleHttpCreateRequest = {
  body: { name: string };
};

export type ArticleHttpCreateResponse = undefined;

export type ArticleHttpUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleHttpUpdateResponse = undefined;

export type ArticleHttpDeleteRequest = {
  params: { id: string };
};

export type ArticleHttpDeleteResponse = undefined;
