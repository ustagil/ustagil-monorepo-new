import { EventStoreDBClient } from '@eventstore/db-client';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyConfigService } from './config';

const EventStore: Provider = {
  provide: EventStoreDBClient,
  inject: [ConfigService],
  useFactory: (configService: MyConfigService) =>
    EventStoreDBClient.connectionString(
      configService.get('API_USER_EVENTSTOREDB_URI', { infer: true }),
    ),
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EventStore],
  exports: [EventStore],
})
export class EventStoreModule {}
