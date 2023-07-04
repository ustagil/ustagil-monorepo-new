export type UserKafkaResponse = {
  _id: string;
  username: string;
  password: string;
};

//-----

export type UserKafkaCreateRequest = {
  body: { username: string; password: string };
};

export type UserKafkaCreateResponse = undefined;

//-----

export type UserKafkaUpdateRequest = {
  params: { id: string };
  body: { username?: string; password?: string };
};

export type UserKafkaUpdateResponse = undefined;

//-----

export type UserKafkaDeleteRequest = {
  params: { id: string };
};

export type UserKafkaDeleteResponse = undefined;
