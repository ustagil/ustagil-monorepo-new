import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_ACCOUNT_COMMAND_MS,
  API_ACCOUNT_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { MyConfigService } from 'src/config';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: API_ACCOUNT_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'account',
            protoPath: join(__dirname, 'account.proto'),
            url: configService.get('API_ACCOUNT_GRPC_CLIENT_URL', {
              infer: true,
            }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: API_ACCOUNT_COMMAND_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('API_ACCOUNT_KAFKA_CLIENT_ID', {
                infer: true,
              }),
              brokers: [
                configService.get('API_ACCOUNT_KAFKA_BROKER', {
                  infer: true,
                }),
              ],
            },
            consumer: {
              groupId: configService.get('API_ACCOUNT_KAFKA_GROUP_ID', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AccountController],
})
export class AccountModule {}
