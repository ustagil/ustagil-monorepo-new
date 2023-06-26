import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  API_USER_CLIENT_URL,
  API_USER_QUERY_MS,
  JWT_SECRET,
} from '@ustagil/api-constant';
import { BaseJwtStrategy, LocalStrategy } from '@ustagil/api-util';
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
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [LocalStrategy, BaseJwtStrategy],
})
export class AppModule {}
