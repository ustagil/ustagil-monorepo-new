import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MyConfigService, validateEnvConfig } from './config';
import { EventStoreModule } from './eventstore.module';
import { TodoModule } from './todo/todo.module';

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
          uri: configService.get('API_TODO_MONGODB_URI', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
    EventStoreModule,
    TodoModule,
  ],
})
export class AppModule {}
