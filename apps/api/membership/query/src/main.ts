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
      package: 'membership',
      protoPath: join(__dirname, 'membership/membership.proto'),
      url: configService.get('API_MEMBERSHIP_GRPC_CLIENT_URL', { infer: true }),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'organization',
      protoPath: join(__dirname, 'organization/organization.proto'),
      url: configService.get('API_ORGANIZATION_GRPC_CLIENT_URL', {
        infer: true,
      }),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'account',
      protoPath: join(__dirname, 'account/account.proto'),
      url: configService.get('API_ACCOUNT_GRPC_CLIENT_URL', {
        infer: true,
      }),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
