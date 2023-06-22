import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  User,
  UserKafkaCreateRequest,
  UserKafkaCreateResponse,
  UserKafkaDeleteRequest,
  UserKafkaDeleteResponse,
  UserKafkaUpdateRequest,
  UserKafkaUpdateResponse,
} from '@ustagil/typing';

@Controller()
export class AppController {
  users: User[] = [];

  @MessagePattern('user.create')
  create(dto: UserKafkaCreateRequest): UserKafkaCreateResponse {
    const nextId = this.users.length;
    const newUser: User = { id: `${nextId}`, ...dto.body };
    this.users.push(newUser);
    return newUser;
  }

  @MessagePattern('user.update')
  update(dto: UserKafkaUpdateRequest): UserKafkaUpdateResponse {
    const foundIndex = this.users.findIndex((e) => e.id === dto.params.id);
    this.users = this.users.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.users[foundIndex];
  }

  @MessagePattern('user.delete')
  delete(dto: UserKafkaDeleteRequest): UserKafkaDeleteResponse {
    return removeObjectWithId(this.users, dto.params.id);
  }
}

function removeObjectWithId<T extends { id: string }>(
  arr: Array<T>,
  id: string,
): T {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    const obj = arr[objWithIdIndex];
    arr.splice(objWithIdIndex, 1);
    return obj;
  }

  return null;
}
