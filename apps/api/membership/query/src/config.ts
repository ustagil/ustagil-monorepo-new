import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_MEMBERSHIP_MONGODB_URI: string;
  API_MEMBERSHIP_GRPC_CLIENT_URL: string;

  API_ORGANIZATION_MONGODB_URI: string;
  API_ORGANIZATION_GRPC_CLIENT_URL: string;

  API_ACCOUNT_MONGODB_URI: string;
  API_ACCOUNT_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_MEMBERSHIP_MONGODB_URI: Joi.string(),
  API_MEMBERSHIP_GRPC_CLIENT_URL: Joi.string(),

  API_ORGANIZATION_MONGODB_URI: Joi.string(),
  API_ORGANIZATION_GRPC_CLIENT_URL: Joi.string(),

  API_ACCOUNT_MONGODB_URI: Joi.string(),
  API_ACCOUNT_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
