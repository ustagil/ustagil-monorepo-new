import { Observable } from "rxjs";

export type ArticleGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type ArticleGrpcListRequest = {
  query: object;
};

// export type ArticleGrpcListResponse = ArticleGrpcResponse[];
export type ArticleGrpcListResponse = ArticleGrpcResponse;

//-----

export type ArticleGrpcReadRequest = {
  params: { id: string };
};

export type ArticleGrpcReadResponse = ArticleGrpcResponse | undefined | null;

export interface ArticleGrpcService {
  list(data: ArticleGrpcListRequest): Observable<ArticleGrpcListResponse>;
  read(data: ArticleGrpcReadRequest): Observable<ArticleGrpcReadResponse>;
}
