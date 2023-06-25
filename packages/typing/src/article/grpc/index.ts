export type ArticleGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type ArticleGrpcListRequest = {
  params: object;
  query: object;
};

// export type ArticleGrpcListResponse = ArticleGrpcResponse[];
export type ArticleGrpcListResponse = ArticleGrpcResponse;

//-----

export type ArticleGrpcReadRequest = {
  params: { id: string };
  query: object;
};

export type ArticleGrpcReadResponse = ArticleGrpcResponse | undefined | null;
