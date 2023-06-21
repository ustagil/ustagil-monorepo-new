import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ARTICLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'article',
          protoPath: join(__dirname, 'article/article.proto'),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ARTICLE_SERVICE',
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
  providers: [AppService],
})
export class AppModule {}
