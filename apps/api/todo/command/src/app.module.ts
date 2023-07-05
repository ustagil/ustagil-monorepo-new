import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { MyConfigService } from './config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_TODO_KAFKA_BROKER: Joi.string(),
        API_TODO_KAFKA_GROUP_ID: Joi.string(),
        API_TODO_MONGODB_URI: Joi.string(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => {
        return {
          uri: configService.get('API_TODO_MONGODB_URI', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
    TodoModule,
  ],
})
export class AppModule {}
