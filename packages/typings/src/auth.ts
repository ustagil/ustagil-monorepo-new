export type JWTTokenClaims = {
  act: string
  exp: number
  iat: number
  knd: string
  sub: string
}

export type JWTTokenPayload = {
  account: string
  id: string
  kind: string
}

export type AuthResponse = {
  accessToken: string
}

export type AuthLoginDto = {
  params: {}
  query: {}
  body: {
    email: string
    password: string
  }
}

export type AuthRegisterDto = {
  params: {}
  query: {}
  body: {
    email: string
    password: string
  }
}

export type AuthVerifyEmailDto = {
  params: {}
  query: {}
  body: {
    email: string
    verifyCode: string
  }
}
