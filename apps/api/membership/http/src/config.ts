import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  PORT: string;

  JWT_SECRET: string;
  JWT_EXPIRE_IN: string;

  API_MEMBERSHIP_KAFKA_BROKER: string;
  API_MEMBERSHIP_KAFKA_CLIENT_ID: string;
  API_MEMBERSHIP_KAFKA_GROUP_ID: string;
  API_MEMBERSHIP_GRPC_CLIENT_URL: string;

  API_ORGANIZATION_KAFKA_BROKER: string;
  API_ORGANIZATION_KAFKA_CLIENT_ID: string;
  API_ORGANIZATION_KAFKA_GROUP_ID: string;
  API_ORGANIZATION_GRPC_CLIENT_URL: string;

  API_ACCOUNT_KAFKA_BROKER: string;
  API_ACCOUNT_KAFKA_CLIENT_ID: string;
  API_ACCOUNT_KAFKA_GROUP_ID: string;
  API_ACCOUNT_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  PORT: Joi.string()
    .regex(/^\d+$/)
    .messages({ 'string.pattern.base': `Port must be number string.` })
    .required(),

  JWT_SECRET: Joi.string(),
  JWT_EXPIRE_IN: Joi.string(),

  API_MEMBERSHIP_KAFKA_BROKER: Joi.string(),
  API_MEMBERSHIP_KAFKA_CLIENT_ID: Joi.string(),
  API_MEMBERSHIP_KAFKA_GROUP_ID: Joi.string(),
  API_MEMBERSHIP_GRPC_CLIENT_URL: Joi.string(),

  API_ORGANIZATION_KAFKA_BROKER: Joi.string(),
  API_ORGANIZATION_KAFKA_CLIENT_ID: Joi.string(),
  API_ORGANIZATION_KAFKA_GROUP_ID: Joi.string(),
  API_ORGANIZATION_GRPC_CLIENT_URL: Joi.string(),

  API_ACCOUNT_KAFKA_BROKER: Joi.string(),
  API_ACCOUNT_KAFKA_CLIENT_ID: Joi.string(),
  API_ACCOUNT_KAFKA_GROUP_ID: Joi.string(),
  API_ACCOUNT_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
