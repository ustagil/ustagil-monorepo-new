import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  User,
  UserGrpcListRequest,
  UserGrpcListResponse,
  UserGrpcReadRequest,
  UserGrpcReadResponse,
} from '@ustagil/typing';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  users: User[] = [
    { id: '1', name: 'name 1' },
    { id: '2', name: 'name 2' },
    { id: '3', name: 'name 3' },
  ];

  @GrpcMethod('UserService', 'List')
  list(dto: UserGrpcListRequest): Observable<UserGrpcListResponse> {
    return from(this.users);
  }

  @GrpcMethod('UserService', 'Read')
  read(dto: UserGrpcReadRequest): UserGrpcReadResponse {
    return this.users.find((e) => e.id === dto.params.id);
  }
}
