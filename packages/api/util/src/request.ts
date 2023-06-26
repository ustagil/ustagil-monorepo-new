import type { Request } from 'express';

export type MyRequest = Request & {
  user: {
    id: string;
    // role: Role;
  };
  jwtPayload: JWTPayload;
};

export type JWTPayload = { sub: string; role: Role };

export enum Role {
  ROLE_UNSPECIFIED = 0,
}
