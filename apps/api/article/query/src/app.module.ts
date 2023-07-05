import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ArticleModule } from './article/article.module';
import { MyConfigService } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_ARTICLE_GRPC_CLIENT_URL: Joi.string(),
        API_ARTICLE_MONGODB_URI: Joi.string(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => {
        return {
          uri: configService.get('API_ARTICLE_MONGODB_URI', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
    ArticleModule,
  ],
})
export class AppModule {}
