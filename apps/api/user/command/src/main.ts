import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MyConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const configService = app.get<MyConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('API_USER_KAFKA_BROKER')],
      },
      consumer: {
        groupId: configService.get('API_USER_KAFKA_GROUP_ID'),
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
