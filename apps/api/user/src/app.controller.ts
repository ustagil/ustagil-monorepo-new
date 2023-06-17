import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  User,
  UserCreateDto,
  UserDeleteDto,
  UserListDto,
  UserReadDto,
  UserUpdateDto,
} from '@ustagil/typing';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  list(dto: UserListDto): User[] {
    return this.appService.list(dto);
  }

  @Post()
  create(dto: UserCreateDto): User {
    return this.appService.create(dto);
  }

  @Get(':id')
  read(dto: UserReadDto): User {
    return this.appService.read(dto);
  }

  @Patch(':id')
  update(dto: UserUpdateDto): User {
    return this.appService.update(dto);
  }

  @Delete(':id')
  delete(dto: UserDeleteDto): User {
    return this.appService.delete(dto);
  }
}
