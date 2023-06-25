export type ArticleKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type ArticleKafkaCreateRequest = {
  params: object;
  query: object;
  body: { name: string };
};

export type ArticleKafkaCreateResponse =
  | ArticleKafkaResponse
  | undefined
  | null;

//-----

export type ArticleKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleKafkaUpdateResponse =
  | ArticleKafkaResponse
  | undefined
  | null;

//-----

export type ArticleKafkaDeleteRequest = {
  params: { id: string };
};

export type ArticleKafkaDeleteResponse =
  | ArticleKafkaResponse
  | undefined
  | null;
