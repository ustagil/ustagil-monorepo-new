import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_SECRET } from '@ustagil/api-constant';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload, MyRequest } from '../request';

@Injectable()
export class BaseJwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configService.getOrThrow('jwt.secret'),
      secretOrKey: JWT_SECRET,
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
