import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_TODO_MONGODB_URI: string;
    API_TODO_GRPC_CLIENT_URL: string;
  },
  true
>;
