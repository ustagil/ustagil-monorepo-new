import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload, MyRequest } from '../request';

type MyConfigService = ConfigService<
  {
    JWT_SECRET: string;
  },
  true
>;

@Injectable()
export class BaseJwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: MyConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    const reqUser: MyRequest['user'] = {
      id: payload.sub,
      // role: payload.role,
    };
    return reqUser;
  }
}
