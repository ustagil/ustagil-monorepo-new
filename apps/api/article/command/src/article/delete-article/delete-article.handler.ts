import {
  EventStoreDBClient,
  FORWARDS,
  START,
  jsonEvent,
} from '@eventstore/db-client';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { ArticleCreatedEvent } from '../create-article/article-created.event';
import { ArticleUpdatedEvent } from '../update-article/article-updated.event';
import { ArticleDeletedEvent } from './article-deleted.event';
import { DeleteArticleCommand } from './delete-article.command';

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler
  implements ICommandHandler<DeleteArticleCommand>
{
  constructor(
    private publisher: EventPublisher,
    private eventStoreDBClient: EventStoreDBClient,
  ) {}

  async execute(command: DeleteArticleCommand) {
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

    articleDomain.delete();

    this.eventStoreDBClient.appendToStream(
      'article-' + articleDomain.id,
      articleDomain.getUncommittedEvents().map(jsonEvent),
    );

    articleDomain.commit();
  }
}
