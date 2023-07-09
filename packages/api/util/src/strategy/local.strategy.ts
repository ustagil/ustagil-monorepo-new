import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { API_MEMBERSHIP_QUERY_MS } from '@ustagil/api-constant';
import { UserGrpcService } from '@ustagil/typing';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'LocalStrategy') {
  private readonly userGrpcService: UserGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_MEMBERSHIP_QUERY_MS) private clientGrpc: ClientGrpc,
  ) {
    super({ usernameField: 'username' });
    this.userGrpcService =
      this.clientGrpc.getService<UserGrpcService>('UserService');
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await firstValueFrom(
      this.userGrpcService.readByUsername({ username: username }),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
