import { Observable } from "rxjs";

export type AccountGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type AccountGrpcListRequest = {
  query: object;
};

// export type AccountGrpcListResponse = AccountGrpcResponse[];
export type AccountGrpcListResponse = AccountGrpcResponse;

//-----

export type AccountGrpcReadRequest = {
  params: { id: string };
};

export type AccountGrpcReadResponse = AccountGrpcResponse | undefined | null;

export interface AccountGrpcService {
  list(data: AccountGrpcListRequest): Observable<AccountGrpcListResponse>;
  read(data: AccountGrpcReadRequest): Observable<AccountGrpcReadResponse>;
}
