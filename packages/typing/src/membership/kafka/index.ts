export type MembershipKafkaResponse = {
  _id: string;
  name: string;
};

//-----

export type MembershipKafkaCreateRequest = {
  body: { name: string };
};

export type MembershipKafkaCreateResponse = undefined;

//-----

export type MembershipKafkaUpdateRequest = {
  params: { id: string };
  body: { name?: string };
};

export type MembershipKafkaUpdateResponse = undefined;

//-----

export type MembershipKafkaDeleteRequest = {
  params: { id: string };
};

export type MembershipKafkaDeleteResponse = undefined;
