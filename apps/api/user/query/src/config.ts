import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_USER_MONGODB_URI: string;
  API_USER_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_USER_MONGODB_URI: Joi.string(),
  API_USER_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
