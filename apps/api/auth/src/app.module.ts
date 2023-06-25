import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { API_USER_CLIENT_URL, API_USER_QUERY_MS } from '@ustagil/api-constant';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: API_USER_QUERY_MS,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, 'user/user.proto'),
          url: API_USER_CLIENT_URL,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
