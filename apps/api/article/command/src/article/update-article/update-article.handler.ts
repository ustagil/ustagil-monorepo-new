import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { ArticleCreatedEvent } from '../create-article/article-created.event';
import { ArticleDeletedEvent } from '../delete-article/article-deleted.event';
import { ArticleUpdatedEvent } from './article-updated.event';
import { UpdateArticleCommand } from './update-article.command';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler
  implements ICommandHandler<UpdateArticleCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: UpdateArticleCommand) {
    const events = this.eventStoreDBClient.readStream<
      ArticleCreatedEvent | ArticleUpdatedEvent | ArticleDeletedEvent
    >('article-' + command.id, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 100,
    });

    const articleDomain = this.publisher.mergeObjectContext(
      await ArticleDomain.evolveFromEvents(events),
    );

    articleDomain.update(command.name);

    this.eventStoreDBClient.appendToStream(
      'article-' + articleDomain.id,
      articleDomain.getUncommittedEvents().map(jsonEvent),
    );

    articleDomain.commit();
  }
}
