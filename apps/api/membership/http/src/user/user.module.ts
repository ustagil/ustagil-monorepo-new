import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_MEMBERSHIP_COMMAND_MS,
  API_MEMBERSHIP_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { MyConfigService } from 'src/config';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: API_MEMBERSHIP_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'membership',
            protoPath: join(__dirname, '..', 'protos', 'membership.proto'),
            loader: {
              includeDirs: [join(__dirname, '..', 'protos')],
            },
            url: configService.get('API_MEMBERSHIP_GRPC_CLIENT_URL', {
              infer: true,
            }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: API_MEMBERSHIP_COMMAND_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('API_MEMBERSHIP_KAFKA_CLIENT_ID', {
                infer: true,
              }),
              brokers: [
                configService.get('API_MEMBERSHIP_KAFKA_BROKER', {
                  infer: true,
                }),
              ],
            },
            consumer: {
              groupId: configService.get('API_MEMBERSHIP_KAFKA_GROUP_ID', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
