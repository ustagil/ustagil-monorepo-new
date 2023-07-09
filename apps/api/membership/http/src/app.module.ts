import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BaseJwtStrategy, JwtAuthGuard } from '@ustagil/api-util';
import { AccountModule } from './account/account.module';
import { MyConfigService, validateEnvConfig } from './config';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validateEnvConfig,
    }),
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

    AccountModule,
    OrganizationModule,
    UserModule,
  ],
  providers: [
    {
      provide: BaseJwtStrategy,
      useFactory: (configService: MyConfigService) =>
        new BaseJwtStrategy(configService),
      inject: [ConfigService],
    },
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
