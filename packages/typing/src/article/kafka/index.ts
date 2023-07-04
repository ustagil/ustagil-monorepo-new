export type ArticleKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type ArticleKafkaCreateRequest = {
  body: { name: string };
};

export type ArticleKafkaCreateResponse = undefined;

//-----

export type ArticleKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type ArticleKafkaUpdateResponse = undefined;

//-----

export type ArticleKafkaDeleteRequest = {
  params: { id: string };
};

export type ArticleKafkaDeleteResponse = undefined;
