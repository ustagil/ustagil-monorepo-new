export type TodoGrpcResponse = {
  id: string;
  name: string;
};

//-----

export type TodoGrpcListRequest = {
  params: object;
  query: object;
};

// export type TodoGrpcListResponse = TodoGrpcResponse[];
export type TodoGrpcListResponse = TodoGrpcResponse;

//-----

export type TodoGrpcReadRequest = {
  params: { id: string };
  query: object;
};

export type TodoGrpcReadResponse = TodoGrpcResponse;
