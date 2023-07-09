export type OrganizationKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type OrganizationKafkaCreateRequest = {
  body: { name: string };
};

export type OrganizationKafkaCreateResponse = undefined;

//-----

export type OrganizationKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type OrganizationKafkaUpdateResponse = undefined;

//-----

export type OrganizationKafkaDeleteRequest = {
  params: { id: string };
};

export type OrganizationKafkaDeleteResponse = undefined;
