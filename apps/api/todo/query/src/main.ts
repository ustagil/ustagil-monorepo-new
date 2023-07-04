import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { MyConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const configService = app.get<MyConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'todo',
      protoPath: join(__dirname, 'todo/todo.proto'),
      url: configService.get('API_TODO_GRPC_CLIENT_URL'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
