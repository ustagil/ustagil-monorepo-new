export type UserKafkaResponse = {
  _id: string;
  username: string;
  password: string;
};

//-----

export type UserKafkaCreateRequest = {
  params: object;
  query: object;
  body: { username: string; password: string };
};

export type UserKafkaCreateResponse = UserKafkaResponse | undefined | null;

//-----

export type UserKafkaUpdateRequest = {
  params: { id: string };
  body: { username?: string; password?: string };
};

export type UserKafkaUpdateResponse = UserKafkaResponse | undefined | null;

//-----

export type UserKafkaDeleteRequest = {
  params: { id: string };
};

export type UserKafkaDeleteResponse = UserKafkaResponse | undefined | null;
