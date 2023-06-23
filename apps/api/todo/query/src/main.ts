import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { API_TODO_CLIENT_URL } from '@ustagil/api-constant';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'todo',
        protoPath: join(__dirname, 'todo/todo.proto'),
        url: API_TODO_CLIENT_URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
