import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  API_KAFKA_BROKER,
  API_TODO_CLIENT_ID,
  API_TODO_CLIENT_URL,
  API_TODO_COMMAND_MS,
  API_TODO_GROUP_ID,
  API_TODO_QUERY_MS,
  JWT_SECRET,
} from '@ustagil/api-constant';
import { BaseJwtStrategy, JwtAuthGuard } from '@ustagil/api-util';
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
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    BaseJwtStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
