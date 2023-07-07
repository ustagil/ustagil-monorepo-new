import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  PORT: string;
  JWT_SECRET: string;
  JWT_EXPIRE_IN: string;
  API_USER_KAFKA_BROKER: string;
  API_USER_KAFKA_CLIENT_ID: string;
  API_USER_KAFKA_GROUP_ID: string;
  API_USER_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  PORT: Joi.string(),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRE_IN: Joi.string(),
  API_USER_KAFKA_BROKER: Joi.string(),
  API_USER_KAFKA_CLIENT_ID: Joi.string(),
  API_USER_KAFKA_GROUP_ID: Joi.string(),
  API_USER_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
