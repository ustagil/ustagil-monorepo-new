import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_ARTICLE_CLIENT_ID,
  API_ARTICLE_CLIENT_URL,
  API_ARTICLE_COMMAND_MS,
  API_ARTICLE_GROUP_ID,
  API_ARTICLE_QUERY_MS,
  API_KAFKA_BROKER,
} from '@ustagil/api-constant';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: API_ARTICLE_QUERY_MS,
        transport: Transport.GRPC,
        options: {
          package: 'article',
          protoPath: join(__dirname, 'article/article.proto'),
          url: API_ARTICLE_CLIENT_URL,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: API_ARTICLE_COMMAND_MS,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: API_ARTICLE_CLIENT_ID,
            brokers: [API_KAFKA_BROKER],
          },
          consumer: {
            groupId: API_ARTICLE_GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}