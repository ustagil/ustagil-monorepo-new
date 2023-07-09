import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  PORT: string;

  JWT_SECRET: string;
  JWT_EXPIRE_IN: string;

  API_TODO_KAFKA_BROKER: string;
  API_TODO_KAFKA_CLIENT_ID: string;
  API_TODO_KAFKA_GROUP_ID: string;
  API_TODO_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  PORT: Joi.string()
    .regex(/^\d+$/)
    .messages({ 'string.pattern.base': `Port must be number string.` })
    .required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_IN: Joi.string().required(),
  API_TODO_KAFKA_BROKER: Joi.string().required(),
  API_TODO_KAFKA_CLIENT_ID: Joi.string().required(),
  API_TODO_KAFKA_GROUP_ID: Joi.string().required(),
  API_TODO_GRPC_CLIENT_URL: Joi.string().required(),
}).strict(true);
