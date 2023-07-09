import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => {
        return {
          uri: configService.get('API_MEMBERSHIP_MONGODB_URI', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),

    AccountModule,
    OrganizationModule,
    UserModule,
  ],
})
export class AppModule {}
