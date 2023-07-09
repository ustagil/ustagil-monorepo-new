import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type MyConfig = {
  API_MEMBERSHIP_EVENTSTOREDB_URI: string;
  API_MEMBERSHIP_KAFKA_BROKER: string;
  API_MEMBERSHIP_KAFKA_GROUP_ID: string;
  API_MEMBERSHIP_MONGODB_URI: string;

  API_ORGANIZATION_EVENTSTOREDB_URI: string;
  API_ORGANIZATION_KAFKA_BROKER: string;
  API_ORGANIZATION_KAFKA_GROUP_ID: string;
  API_ORGANIZATION_MONGODB_URI: string;

  API_ACCOUNT_EVENTSTOREDB_URI: string;
  API_ACCOUNT_KAFKA_BROKER: string;
  API_ACCOUNT_KAFKA_GROUP_ID: string;
  API_ACCOUNT_MONGODB_URI: string;
};

export type MyConfigService = ConfigService<MyConfig, true>;

export const validateEnvConfig = Joi.object<MyConfig, true>({
  API_MEMBERSHIP_EVENTSTOREDB_URI: Joi.string(),
  API_MEMBERSHIP_KAFKA_BROKER: Joi.string(),
  API_MEMBERSHIP_KAFKA_GROUP_ID: Joi.string(),
  API_MEMBERSHIP_MONGODB_URI: Joi.string(),

  API_ORGANIZATION_EVENTSTOREDB_URI: Joi.string(),
  API_ORGANIZATION_KAFKA_BROKER: Joi.string(),
  API_ORGANIZATION_KAFKA_GROUP_ID: Joi.string(),
  API_ORGANIZATION_MONGODB_URI: Joi.string(),

  API_ACCOUNT_EVENTSTOREDB_URI: Joi.string(),
  API_ACCOUNT_KAFKA_BROKER: Joi.string(),
  API_ACCOUNT_KAFKA_GROUP_ID: Joi.string(),
  API_ACCOUNT_MONGODB_URI: Joi.string(),
}).strict(true);
