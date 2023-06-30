import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_KAFKA_BROKER,
  API_USER_CLIENT_ID,
  API_USER_CLIENT_URL,
  API_USER_COMMAND_MS,
  API_USER_GROUP_ID,
  API_USER_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: API_USER_QUERY_MS,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, 'user.proto'),
          url: API_USER_CLIENT_URL,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: API_USER_COMMAND_MS,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: API_USER_CLIENT_ID,
            brokers: [API_KAFKA_BROKER],
          },
          consumer: {
            groupId: API_USER_GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
