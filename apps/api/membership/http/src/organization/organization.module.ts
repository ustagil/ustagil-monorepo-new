import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_ORGANIZATION_COMMAND_MS,
  API_ORGANIZATION_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { MyConfigService } from 'src/config';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: API_ORGANIZATION_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'organization',
            protoPath: join(__dirname, 'organization.proto'),
            url: configService.get('API_ORGANIZATION_GRPC_CLIENT_URL', {
              infer: true,
            }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: API_ORGANIZATION_COMMAND_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('API_ORGANIZATION_KAFKA_CLIENT_ID', {
                infer: true,
              }),
              brokers: [
                configService.get('API_ORGANIZATION_KAFKA_BROKER', {
                  infer: true,
                }),
              ],
            },
            consumer: {
              groupId: configService.get('API_ORGANIZATION_KAFKA_GROUP_ID', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
