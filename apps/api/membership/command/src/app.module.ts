import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { MyConfigService, validateEnvConfig } from './config';
import { EventStoreModule } from './eventstore.module';
import { MembershipModule } from './membership/membership.module';
import { OrganizationModule } from './organization/organization.module';

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
    EventStoreModule,

    AccountModule,
    MembershipModule,
    OrganizationModule,
  ],
})
export class AppModule {}
