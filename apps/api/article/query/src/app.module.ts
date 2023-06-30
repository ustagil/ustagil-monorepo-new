import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@172.17.0.1:27017'),
    ArticleModule,
  ],
})
export class AppModule {}
