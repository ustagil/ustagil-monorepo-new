import {
  EventStoreDBClient,
  NO_STREAM,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { CreateArticleCommand } from './create-article.command';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: CreateArticleCommand) {
    const article = ArticleDomain.create(command.name);
    const articleDomain = this.publisher.mergeObjectContext(article);

    try {
      await this.eventStoreDBClient.appendToStream(
        'article-' + articleDomain.id,
        articleDomain.getUncommittedEvents().map(jsonEvent),
        {
          expectedRevision: NO_STREAM,
        },
      );
      articleDomain.commit();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
