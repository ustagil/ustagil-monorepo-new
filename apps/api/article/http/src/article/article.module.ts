import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_ARTICLE_COMMAND_MS,
  API_ARTICLE_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { MyConfigService } from 'src/config';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: API_ARTICLE_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'article',
            protoPath: join(__dirname, 'article.proto'),
            url: configService.get('API_ARTICLE_GRPC_CLIENT_URL', {
              infer: true,
            }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: API_ARTICLE_COMMAND_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('API_ARTICLE_KAFKA_CLIENT_ID', {
                infer: true,
              }),
              brokers: [
                configService.get('API_ARTICLE_KAFKA_BROKER', { infer: true }),
              ],
            },
            consumer: {
              groupId: configService.get('API_ARTICLE_KAFKA_GROUP_ID', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ArticleController],
})
export class ArticleModule {}
