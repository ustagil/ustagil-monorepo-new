import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  Todo,
  TodoCreateDto,
  TodoDeleteDto,
  TodoListDto,
  TodoReadDto,
  TodoUpdateDto,
} from '@ustagil/typing';
import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  list(dto: TodoListDto): Todo[] {
    return this.appService.list(dto);
  }

  @Post()
  create(dto: TodoCreateDto): Todo {
    return this.appService.create(dto);
  }

  @Get(':id')
  read(dto: TodoReadDto): Todo {
    return this.appService.read(dto);
  }

  @Patch(':id')
  update(dto: TodoUpdateDto): Todo {
    return this.appService.update(dto);
  }

  @Delete(':id')
  delete(dto: TodoDeleteDto): Todo {
    return this.appService.delete(dto);
  }
}
