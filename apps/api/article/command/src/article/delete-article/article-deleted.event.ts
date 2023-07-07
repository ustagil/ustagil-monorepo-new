import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type ArticleDeletedEventMetaData = unknown;

type ArticleDeletedEventData = {
  id: string;
};

export class ArticleDeletedEvent
  implements
    IEvent,
    JSONEventType<'ArticleDeletedEvent', ArticleDeletedEventData>
{
  type = 'ArticleDeletedEvent' as const;
  data: ArticleDeletedEventData;
  metadata: ArticleDeletedEventMetaData = {};

  constructor(id: string) {
    this.data = { id };
  }
}
