import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    PORT: string;
    API_TODO_KAFKA_BROKER: string;
    API_TODO_KAFKA_GROUP_ID: string;
    API_TODO_MONGODB_URI: string;
  },
  true
>;
