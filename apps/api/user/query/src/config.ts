import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_USER_MONGODB_URI: string;
    API_USER_GRPC_CLIENT_URL: string;
  },
  true
>;
