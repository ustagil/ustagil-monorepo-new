export type AccountKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type AccountKafkaCreateRequest = {
  body: { name: string };
};

export type AccountKafkaCreateResponse = undefined;

//-----

export type AccountKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type AccountKafkaUpdateResponse = undefined;

//-----

export type AccountKafkaDeleteRequest = {
  params: { id: string };
};

export type AccountKafkaDeleteResponse = undefined;
