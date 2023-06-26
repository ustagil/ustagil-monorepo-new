import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard, MyRequest } from '@ustagil/api-util';

@Controller('auth')
export class AppController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: MyRequest): Promise<any> {
    const payload = { sub: req.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
