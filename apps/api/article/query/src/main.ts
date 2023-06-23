import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { API_ARTICLE_CLIENT_URL } from '@ustagil/api-constant';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'article',
        protoPath: join(__dirname, 'article/article.proto'),
        url: API_ARTICLE_CLIENT_URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
