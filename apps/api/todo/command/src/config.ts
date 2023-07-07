import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_TODO_KAFKA_BROKER: string;
  API_TODO_KAFKA_GROUP_ID: string;
  API_TODO_MONGODB_URI: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_TODO_KAFKA_BROKER: Joi.string(),
  API_TODO_KAFKA_GROUP_ID: Joi.string(),
  API_TODO_MONGODB_URI: Joi.string(),
}).strict(true);
