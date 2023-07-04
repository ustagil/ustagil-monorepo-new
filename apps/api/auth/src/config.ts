import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRE_IN: string;
    API_USER_GRPC_CLIENT_URL: string;
  },
  true
>;
