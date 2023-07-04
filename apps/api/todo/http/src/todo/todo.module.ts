import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { API_TODO_COMMAND_MS, API_TODO_QUERY_MS } from '@ustagil/api-constant';
import { join } from 'path';
import { MyConfigService } from 'src/config';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: API_TODO_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'todo',
            protoPath: join(__dirname, 'todo.proto'),
            url: configService.get('API_TODO_GRPC_CLIENT_URL', { infer: true }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: API_TODO_COMMAND_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('API_TODO_KAFKA_CLIENT_ID', {
                infer: true,
              }),
              brokers: [
                configService.get('API_TODO_KAFKA_BROKER', { infer: true }),
              ],
            },
            consumer: {
              groupId: configService.get('API_TODO_KAFKA_GROUP_ID', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TodoController],
})
export class TodoModule {}
