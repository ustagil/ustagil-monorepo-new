export type JWTTokenClaims = {
  act: string;
  exp: number;
  iat: number;
  knd: string;
  sub: string;
};

export type JWTTokenPayload = {
  account: string;
  id: string;
  kind: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type AuthLoginDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: {
    email: string;
    password: string;
  };
};

export type AuthRegisterDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: {
    email: string;
    password: string;
  };
};

export type AuthVerifyEmailDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: {
    email: string;
    verifyCode: string;
  };
};
