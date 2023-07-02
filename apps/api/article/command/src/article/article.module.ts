import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleSagas } from './article.saga';
import { ArticleModel, ArticleSchema } from './article.schema';
import { ArticleCreatedHandler } from './create-article/article-created.handler';
import { CreateArticleHandler } from './create-article/create-article.handler';
import { ArticleDeletedHandler } from './delete-article/article-deleted.handler';
import { DeleteArticleHandler } from './delete-article/delete-article.handler';
import { ArticleUpdatedHandler } from './update-article/article-updated.handler';
import { UpdateArticleHandler } from './update-article/update-article.handler';

const CommandHandlers = [
  CreateArticleHandler,
  UpdateArticleHandler,
  DeleteArticleHandler,
];
const EventHandlers = [
  ArticleCreatedHandler,
  ArticleUpdatedHandler,
  ArticleDeletedHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleModel.name, schema: ArticleSchema },
    ]),
    CqrsModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleSagas, ...CommandHandlers, ...EventHandlers],
})
export class ArticleModule {}
