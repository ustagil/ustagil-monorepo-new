export type UserGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type UserGrpcListRequest = {
  params: object;
  query: object;
};

// export type UserGrpcListResponse = UserGrpcResponse[];
export type UserGrpcListResponse = UserGrpcResponse;

//-----

export type UserGrpcReadRequest = {
  params: { id: string };
  query: object;
};

export type UserGrpcReadResponse = UserGrpcResponse;
