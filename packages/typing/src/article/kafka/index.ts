export type ArticleKafkaResponse = {
  id: string;
  name: string;
};

//-----

export type ArticleKafkaCreateRequest = {
  params: object;
  query: object;
  body: { name: string };
};

export type ArticleKafkaCreateResponse = ArticleKafkaResponse;

//-----

export type ArticleKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleKafkaUpdateResponse = ArticleKafkaResponse;

//-----

export type ArticleKafkaDeleteRequest = {
  params: { id: string };
};

export type ArticleKafkaDeleteResponse = ArticleKafkaResponse;
