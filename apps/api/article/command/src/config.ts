import { ConfigService } from '@nestjs/config';

export type MyConfigService = ConfigService<
  {
    API_ARTICLE_EVENTSTOREDB_URI: string;
    API_ARTICLE_KAFKA_BROKER: string;
    API_ARTICLE_KAFKA_GROUP_ID: string;
    API_ARTICLE_MONGODB_URI: string;
  },
  true
>;
