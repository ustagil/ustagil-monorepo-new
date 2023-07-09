import { Observable } from "rxjs";

export type OrganizationGrpcResponse = {
  _id: string;
  name: string;
};

//-----

export type OrganizationGrpcListRequest = {
  query: object;
};

// export type OrganizationGrpcListResponse = OrganizationGrpcResponse[];
export type OrganizationGrpcListResponse = OrganizationGrpcResponse;

//-----

export type OrganizationGrpcReadRequest = {
  params: { id: string };
};

export type OrganizationGrpcReadResponse =
  | OrganizationGrpcResponse
  | undefined
  | null;

export interface OrganizationGrpcService {
  list(
    data: OrganizationGrpcListRequest
  ): Observable<OrganizationGrpcListResponse>;
  read(
    data: OrganizationGrpcReadRequest
  ): Observable<OrganizationGrpcReadResponse>;
}
