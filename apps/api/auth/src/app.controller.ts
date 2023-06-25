import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { API_USER_QUERY_MS } from '@ustagil/api-constant';
import { AuthLoginDto, User, UserGrpcService } from '@ustagil/typing';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AppController implements OnModuleInit {
  private userGrpcService: UserGrpcService;
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Inject(API_USER_QUERY_MS) private clientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.userGrpcService =
      this.clientGrpc.getService<UserGrpcService>('UserService');
  }

  @Post('login')
  async login(@Body() body: AuthLoginDto['body']): Promise<User> {
    const user = await firstValueFrom(
      this.userGrpcService.readByUsername({ username: body.username }),
    );

    if (user?.password !== body.password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
