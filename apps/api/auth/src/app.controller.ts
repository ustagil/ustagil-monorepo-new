import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { API_USER_QUERY_MS } from '@ustagil/api-constant';
import { AuthLoginDto, User, UserGrpcService } from '@ustagil/typing';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AppController implements OnModuleInit {
  private userGrpcService: UserGrpcService;

  constructor(@Inject(API_USER_QUERY_MS) private clientGrpc: ClientGrpc) {}

  async onModuleInit() {
    this.userGrpcService =
      this.clientGrpc.getService<UserGrpcService>('UserService');
  }

  @Post('login')
  async login(@Body() body: AuthLoginDto['body']): Promise<User> {
    return await firstValueFrom(
      this.userGrpcService.readByUsername({ username: body.username }),
    );
  }
}
