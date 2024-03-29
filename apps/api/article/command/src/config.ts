import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_ARTICLE_EVENTSTOREDB_URI: string;
  API_ARTICLE_KAFKA_BROKER: string;
  API_ARTICLE_KAFKA_GROUP_ID: string;
  API_ARTICLE_MONGODB_URI: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_ARTICLE_EVENTSTOREDB_URI: Joi.string().required(),
  API_ARTICLE_KAFKA_BROKER: Joi.string().required(),
  API_ARTICLE_KAFKA_GROUP_ID: Joi.string().required(),
  API_ARTICLE_MONGODB_URI: Joi.string().required(),
}).strict(true);
