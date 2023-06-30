import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleModel, ArticleSchema } from './article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleModel.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [],
})
export class ArticleModule {}
