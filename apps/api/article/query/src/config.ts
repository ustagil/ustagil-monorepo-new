import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_ARTICLE_GRPC_CLIENT_URL: string;
  API_ARTICLE_MONGODB_URI: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_ARTICLE_GRPC_CLIENT_URL: Joi.string().required(),
  API_ARTICLE_MONGODB_URI: Joi.string().required(),
}).strict(true);
