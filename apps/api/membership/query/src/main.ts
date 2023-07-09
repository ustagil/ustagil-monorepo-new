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
      package: ['user', 'organization', 'account'],
      protoPath: [
        join(__dirname, 'protos/user.proto'),
        join(__dirname, 'protos/organization.proto'),
        join(__dirname, 'protos/account.proto'),
      ],
      url: configService.get('API_MEMBERSHIP_GRPC_CLIENT_URL', {
        infer: true,
      }),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
