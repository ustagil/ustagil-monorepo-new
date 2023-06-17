import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  list(): string {
    return this.appService.list();
  }

  @Post()
  create(): string {
    return this.appService.create();
  }

  @Get(':id')
  read(): string {
    return this.appService.read();
  }

  @Patch(':id')
  update(): string {
    return this.appService.update();
  }

  @Delete(':id')
  delete(): string {
    return this.appService.delete();
  }
}
