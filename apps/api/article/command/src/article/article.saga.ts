import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { ArticleCreatedEvent } from './create-article/article-created.event';
import { ArticleDeletedEvent } from './delete-article/article-deleted.event';
import { ArticleUpdatedEvent } from './update-article/article-updated.event';

@Injectable()
export class ArticleSagas {
  @Saga()
  articleCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(ArticleCreatedEvent), ignoreElements());
  };

  @Saga()
  articleUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(ArticleUpdatedEvent), ignoreElements());
  };

  @Saga()
  articleDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(ArticleDeletedEvent), ignoreElements());
  };
}
