export type UserKafkaResponse = {
  id: string;
  name: string;
};

//-----

export type UserKafkaCreateRequest = {
  params: object;
  query: object;
  body: { name: string };
};

export type UserKafkaCreateResponse = UserKafkaResponse;

//-----

export type UserKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type UserKafkaUpdateResponse = UserKafkaResponse;

//-----

export type UserKafkaDeleteRequest = {
  params: { id: string };
};

export type UserKafkaDeleteResponse = UserKafkaResponse;
