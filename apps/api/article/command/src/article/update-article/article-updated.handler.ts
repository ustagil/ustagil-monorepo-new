import { NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleModel } from '../article.schema';
import { ArticleUpdatedEvent } from './article-updated.event';

@EventsHandler(ArticleUpdatedEvent)
export class ArticleUpdatedHandler
  implements IEventHandler<ArticleUpdatedEvent>
{
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
  ) {}

  async handle(event: ArticleUpdatedEvent) {
    const { id, ...rest } = event.data;
    const article = await this.articleModel.findById(id).exec();

    if (!article) throw new NotFoundException();

    await this.articleModel.updateOne({ _id: id }, rest).exec();

    return Object.assign(article.toObject(), rest);
  }
}
