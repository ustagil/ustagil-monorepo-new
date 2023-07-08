import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { API_USER_COMMAND_MS } from '@ustagil/api-constant';
import { LocalAuthGuard, MyRequest } from '@ustagil/api-util';
import { UserKafkaCreateRequest } from '@ustagil/typing';
import * as bcrypt from 'bcrypt';
import { RegisterAuthRequestBodyDto } from './register.dto';

const saltOrRounds = 10;

@Controller('auth')
export class AppController {
  constructor(
    private jwtService: JwtService,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_USER_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: MyRequest): Promise<any> {
    const payload = { sub: req.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('register')
  async register(@Body() body: RegisterAuthRequestBodyDto): Promise<any> {
    const hash = await bcrypt.hash(body.password, saltOrRounds);

    this.clientKafka.emit<any, UserKafkaCreateRequest>('user.create', {
      body: { username: body.username, password: hash },
    });
  }
}
