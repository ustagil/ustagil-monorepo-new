import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_ARTICLE_GRPC_CLIENT_URL: string;
    API_ARTICLE_MONGODB_URI: string;
  },
  true
>;
