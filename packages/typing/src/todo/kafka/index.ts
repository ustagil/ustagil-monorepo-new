export type TodoKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type TodoKafkaCreateRequest = {
  params: object;
  query: object;
  body: { name: string };
};

export type TodoKafkaCreateResponse = TodoKafkaResponse | undefined | null;

//-----

export type TodoKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type TodoKafkaUpdateResponse = TodoKafkaResponse | undefined | null;

//-----

export type TodoKafkaDeleteRequest = {
  params: { id: string };
};

export type TodoKafkaDeleteResponse = TodoKafkaResponse | undefined | null;
