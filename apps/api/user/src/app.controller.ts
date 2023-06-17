import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  list(): string {
    return this.appService.getHello();
  }

  @Post()
  create(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  read(): string {
    return this.appService.getHello();
  }

  @Patch(':id')
  update(): string {
    return this.appService.getHello();
  }

  @Delete(':id')
  delete(): string {
    return this.appService.getHello();
  }
}
