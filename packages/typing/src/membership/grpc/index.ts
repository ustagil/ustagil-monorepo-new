import { Observable } from "rxjs";

export type MembershipGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type MembershipGrpcListRequest = {
  query: object;
};

// export type MembershipGrpcListResponse = MembershipGrpcResponse[];
export type MembershipGrpcListResponse = MembershipGrpcResponse;

//-----

export type MembershipGrpcReadRequest = {
  params: { id: string };
};

export type MembershipGrpcReadResponse =
  | MembershipGrpcResponse
  | undefined
  | null;

export interface MembershipGrpcService {
  list(data: MembershipGrpcListRequest): Observable<MembershipGrpcListResponse>;
  read(data: MembershipGrpcReadRequest): Observable<MembershipGrpcReadResponse>;
}
