import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<MyConfigService>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
