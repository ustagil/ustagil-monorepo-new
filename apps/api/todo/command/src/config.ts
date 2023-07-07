import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_TODO_EVENTSTOREDB_URI: string;
    API_TODO_KAFKA_BROKER: string;
    API_TODO_KAFKA_GROUP_ID: string;
    API_TODO_MONGODB_URI: string;
  },
  true
>;
