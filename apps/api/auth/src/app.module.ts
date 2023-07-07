import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { API_USER_QUERY_MS } from '@ustagil/api-constant';
import { BaseJwtStrategy, LocalStrategy } from '@ustagil/api-util';
import { join } from 'path';
import { AppController } from './app.controller';
import { MyConfigService, validateEnvConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validateEnvConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: API_USER_QUERY_MS,
        imports: [ConfigModule],
        useFactory: async (configService: MyConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: join(__dirname, 'user/user.proto'),
            url: configService.get('API_USER_GRPC_CLIENT_URL', { infer: true }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE_IN', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    LocalStrategy,
    {
      provide: BaseJwtStrategy,
      useFactory: (configService: MyConfigService) =>
        new BaseJwtStrategy(configService),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
