import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { API_ARTICLE_GROUP_ID, API_KAFKA_BROKER } from '@ustagil/api-constant';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [API_KAFKA_BROKER],
        },
        consumer: {
          groupId: API_ARTICLE_GROUP_ID,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
