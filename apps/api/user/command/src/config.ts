import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_USER_EVENTSTOREDB_URI: string;
    API_USER_KAFKA_BROKER: string;
    API_USER_KAFKA_GROUP_ID: string;
    API_USER_MONGODB_URI: string;
  },
  true
>;
