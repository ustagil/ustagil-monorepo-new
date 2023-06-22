import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ARTICLE_QUERY',
        transport: Transport.GRPC,
        options: {
          package: 'article',
          protoPath: join(__dirname, 'article/article.proto'),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ARTICLE_COMMAND',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'article',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'article-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
