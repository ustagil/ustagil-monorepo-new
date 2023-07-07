import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_TODO_MONGODB_URI: string;
  API_TODO_GRPC_CLIENT_URL: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_TODO_MONGODB_URI: Joi.string(),
  API_TODO_GRPC_CLIENT_URL: Joi.string(),
}).strict(true);
