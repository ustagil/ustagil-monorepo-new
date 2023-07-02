import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleModel } from '../article.schema';
import { ArticleCreatedEvent } from './article-created.event';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent>
{
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: ArticleCreatedEvent) {
    const articleDocument = new this.articleModel(event);
    const article = await articleDocument.save();

    return article.toObject();
  }
}
