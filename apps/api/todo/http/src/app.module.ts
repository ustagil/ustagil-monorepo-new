import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_KAFKA_BROKER,
  API_TODO_CLIENT_ID,
  API_TODO_CLIENT_URL,
  API_TODO_COMMAND_MS,
  API_TODO_GROUP_ID,
  API_TODO_QUERY_MS,
} from '@ustagil/api-constant';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: API_TODO_QUERY_MS,
        transport: Transport.GRPC,
        options: {
          package: 'todo',
          protoPath: join(__dirname, 'todo/todo.proto'),
          url: API_TODO_CLIENT_URL,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: API_TODO_COMMAND_MS,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: API_TODO_CLIENT_ID,
            brokers: [API_KAFKA_BROKER],
          },
          consumer: {
            groupId: API_TODO_GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
