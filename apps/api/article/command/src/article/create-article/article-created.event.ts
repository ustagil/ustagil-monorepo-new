import { JSONEventType, MetadataType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type ArticleCreatedEventMetaData = MetadataType;

type ArticleCreatedEventData = {
  id: string;
  name: string;
};

export class ArticleCreatedEvent
  implements
    IEvent,
    JSONEventType<'ArticleCreatedEvent', ArticleCreatedEventData>
{
  type = 'ArticleCreatedEvent' as const;
  data: ArticleCreatedEventData;
  metadata: ArticleCreatedEventMetaData = {};

  constructor(id: string, name: string) {
    this.data = { id, name };
  }
}
