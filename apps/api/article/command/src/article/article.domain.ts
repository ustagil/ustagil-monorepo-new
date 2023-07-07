import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { ArticleCreatedEvent } from './create-article/article-created.event';
import { ArticleDeletedEvent } from './delete-article/article-deleted.event';
import { ArticleUpdatedEvent } from './update-article/article-updated.event';

export class ArticleDomain extends AggregateRoot<
  ArticleCreatedEvent | ArticleDeletedEvent | ArticleUpdatedEvent
> {
  private _id: string;
  private name: string;
  private deleted: boolean;

  private constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.deleted = false;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  static create(name: string) {
    // Business logic
    const instance = new ArticleDomain(
      new Types.ObjectId().toHexString(),
      name,
    );
    instance.apply(new ArticleCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: ArticleCreatedEvent) {
    return new ArticleDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new ArticleUpdatedEvent(this.id, name));
  }

  private onUpdate(event: ArticleUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
  }

  delete() {
    // Business logic
    this.apply(new ArticleDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: ArticleDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<
        ArticleCreatedEvent | ArticleDeletedEvent | ArticleUpdatedEvent
      >
    >,
  ): Promise<ArticleDomain> {
    let articleDomainInstance!: ArticleDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'ArticleCreatedEvent':
          articleDomainInstance = ArticleDomain.onCreate(
            new ArticleCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'ArticleUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          articleDomainInstance.onUpdate(
            new ArticleUpdatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'ArticleDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          articleDomainInstance.onDelete(
            new ArticleDeletedEvent(event.data.id),
          );
          break;

        default:
          break;
      }
    }

    return articleDomainInstance;
  }
}
