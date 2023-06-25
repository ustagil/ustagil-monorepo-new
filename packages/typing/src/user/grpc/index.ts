import { Observable } from "rxjs";

export type UserGrpcResponse = {
  _id: string;
  username: string;
  password: string;
};

//-----

export type UserGrpcListRequest = {
  params: object;
  query: object;
};

// export type UserGrpcListResponse = UserGrpcResponse[];
export type UserGrpcListResponse = UserGrpcResponse | undefined | null;

//-----

export type UserGrpcReadRequest = {
  params: { id: string };
  query: object;
};

export type UserGrpcReadResponse = UserGrpcResponse | undefined | null;

//-----

export type UserGrpcReadByUsernameRequest = {
  username: string;
};

export type UserGrpcReadByUsernameResponse =
  | UserGrpcResponse
  | undefined
  | null;

export interface UserGrpcService {
  list(data: UserGrpcListRequest): Observable<UserGrpcListResponse>;
  read(data: UserGrpcReadRequest): Observable<UserGrpcReadResponse>;
  readByUsername(
    data: UserGrpcReadByUsernameRequest
  ): Observable<UserGrpcReadByUsernameResponse>;
}
