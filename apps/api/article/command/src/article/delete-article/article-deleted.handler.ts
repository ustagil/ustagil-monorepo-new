import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleModel } from '../article.schema';
import { ArticleDeletedEvent } from './article-deleted.event';

@EventsHandler(ArticleDeletedEvent)
export class ArticleDeletedHandler
  implements IEventHandler<ArticleDeletedEvent>
{
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
  ) {}

  async handle(event: ArticleDeletedEvent) {
    const article = await this.articleModel.findById(event.data.id).exec();

    if (!article) throw new NotFoundException();

    await this.articleModel.deleteOne({ _id: event.data.id }).exec();

    return article.toObject();
  }
}
