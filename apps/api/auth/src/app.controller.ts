import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(dto: unknown): string {
    return this.appService.login(dto);
  }
}
