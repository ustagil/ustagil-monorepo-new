import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    PORT: number;
    JWT_SECRET: string;
    JWT_EXPIRE_IN: string;
    API_ARTICLE_KAFKA_BROKER: string;
    API_ARTICLE_KAFKA_CLIENT_ID: string;
    API_ARTICLE_KAFKA_GROUP_ID: string;
    API_ARTICLE_GRPC_CLIENT_URL: string;
  },
  true
>;
