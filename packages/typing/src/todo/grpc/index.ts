import { Observable } from "rxjs";

export type TodoGrpcResponse = {
  _id: string;
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

export type TodoGrpcReadResponse = TodoGrpcResponse | undefined | null;

export interface TodoGrpcService {
  list(data: TodoGrpcListRequest): Observable<TodoGrpcListResponse>;
  read(data: TodoGrpcReadRequest): Observable<TodoGrpcReadResponse>;
}
