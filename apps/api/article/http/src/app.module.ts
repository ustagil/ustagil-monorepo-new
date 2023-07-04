import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BaseJwtStrategy, JwtAuthGuard } from '@ustagil/api-util';
import { ArticleModule } from './article/article.module';
import { MyConfigService } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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

    ArticleModule,
  ],
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
