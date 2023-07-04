import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRE_IN: string;
    API_TODO_KAFKA_BROKER: string;
    API_TODO_KAFKA_CLIENT_ID: string;
    API_TODO_KAFKA_GROUP_ID: string;
    API_TODO_GRPC_CLIENT_URL: string;
  },
  true
>;
