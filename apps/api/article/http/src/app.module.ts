import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BaseJwtStrategy, JwtAuthGuard } from '@ustagil/api-util';
import * as Joi from 'joi';
import { ArticleModule } from './article/article.module';
import { MyConfigService } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        JWT_SECRET: Joi.string(),
        JWT_EXPIRE_IN: Joi.string(),
        API_ARTICLE_KAFKA_BROKER: Joi.string(),
        API_ARTICLE_KAFKA_CLIENT_ID: Joi.string(),
        API_ARTICLE_KAFKA_GROUP_ID: Joi.string(),
        API_ARTICLE_GRPC_CLIENT_URL: Joi.string(),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE_IN', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),

    ArticleModule,
  ],
  providers: [
    {
      provide: BaseJwtStrategy,
      useFactory: (configService: MyConfigService) =>
        new BaseJwtStrategy(configService),
      inject: [ConfigService],
    },
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
