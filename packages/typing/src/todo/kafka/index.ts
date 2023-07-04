export type TodoKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type TodoKafkaCreateRequest = {
  body: { name: string };
};

export type TodoKafkaCreateResponse = undefined;

//-----

export type TodoKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type TodoKafkaUpdateResponse = undefined;

//-----

export type TodoKafkaDeleteRequest = {
  params: { id: string };
};

export type TodoKafkaDeleteResponse = undefined;
