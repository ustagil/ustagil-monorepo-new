import { JSONEventType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type ArticleUpdatedEventMetaData = unknown;

type ArticleUpdatedEventData = {
  id: string;
  name?: string;
};

export class ArticleUpdatedEvent
  implements
    IEvent,
    JSONEventType<'ArticleUpdatedEvent', ArticleUpdatedEventData>
{
  type = 'ArticleUpdatedEvent' as const;
  data: ArticleUpdatedEventData;
  metadata: ArticleUpdatedEventMetaData = {};

  constructor(id: string, name?: string) {
    this.data = { id, name };
  }
}
