import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { TodoCreatedEvent } from './create-todo/todo-created.event';
import { TodoDeletedEvent } from './delete-todo/todo-deleted.event';
import { TodoUpdatedEvent } from './update-todo/todo-updated.event';

@Injectable()
export class TodoSagas {
  @Saga()
  todoCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(TodoCreatedEvent), ignoreElements());
  };

  @Saga()
  todoUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(TodoUpdatedEvent), ignoreElements());
  };

  @Saga()
  todoDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(TodoDeletedEvent), ignoreElements());
  };
}
