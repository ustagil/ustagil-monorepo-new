import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { MyConfigService, validateEnvConfig } from './config';
import { EventStoreModule } from './eventstore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validateEnvConfig,
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
    EventStoreModule,
    ArticleModule,
  ],
})
export class AppModule {}
