import { Injectable } from '@nestjs/common';
import {
  User,
  UserCreateDto,
  UserDeleteDto,
  UserListDto,
  UserReadDto,
  UserUpdateDto,
} from '@ustagil/typing';

@Injectable()
export class AppService {
  users: User[] = [];

  list(dto: UserListDto): User[] {
    dto;
    return this.users;
  }

  create(dto: UserCreateDto): User {
    const nextId = this.users.length;
    const newUser: User = { id: `${nextId}`, ...dto.body };
    this.users.push(newUser);
    return newUser;
  }

  read(dto: UserReadDto): User {
    return this.users.find((e) => e.name === dto.params.id);
  }

  update(dto: UserUpdateDto): User {
    const foundIndex = this.users.findIndex((e) => e.id === dto.params.id);
    this.users = this.users.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.users[foundIndex];
  }

  delete(dto: UserDeleteDto): User {
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
