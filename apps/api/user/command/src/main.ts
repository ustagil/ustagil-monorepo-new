import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { API_KAFKA_BROKER, API_USER_GROUP_ID } from '@ustagil/api-constant';
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
          groupId: API_USER_GROUP_ID,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
