import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRE_IN: string;
  API_ARTICLE_KAFKA_BROKER: string;
  API_ARTICLE_KAFKA_CLIENT_ID: string;
  API_ARTICLE_KAFKA_GROUP_ID: string;
  API_ARTICLE_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  PORT: Joi.number(),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRE_IN: Joi.string(),
  API_ARTICLE_KAFKA_BROKER: Joi.string(),
  API_ARTICLE_KAFKA_CLIENT_ID: Joi.string(),
  API_ARTICLE_KAFKA_GROUP_ID: Joi.string(),
  API_ARTICLE_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
