import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ArticleModel, ArticleSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@172.17.0.1:27017'),
    MongooseModule.forFeature([
      { name: ArticleModel.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
