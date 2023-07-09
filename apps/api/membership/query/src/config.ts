import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_MEMBERSHIP_GRPC_CLIENT_URL: string;
  API_MEMBERSHIP_MONGODB_URI: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_MEMBERSHIP_MONGODB_URI: Joi.string().required(),
  API_MEMBERSHIP_GRPC_CLIENT_URL: Joi.string().required(),
}).strict(true);
