import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { ArticleCreatedEvent } from './create-article/article-created.event';
import { ArticleDeletedEvent } from './delete-article/article-deleted.event';
import { ArticleUpdatedEvent } from './update-article/article-updated.event';

export class ArticleDomain extends AggregateRoot {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name = '') {
    super();
    this.name = name;
    this.id = id;
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

  update(name?: string) {
    // Business logic
    this.apply(new ArticleUpdatedEvent(this.id, name));
  }

  delete() {
    // Business logic
    this.apply(new ArticleDeletedEvent(this.id));
  }
}
