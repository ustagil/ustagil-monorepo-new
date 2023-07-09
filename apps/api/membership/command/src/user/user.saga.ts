import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { UserCreatedEvent } from './create-user/user-created.event';
import { UserDeletedEvent } from './delete-user/user-deleted.event';
import { UserUpdatedEvent } from './update-user/user-updated.event';

@Injectable()
export class UserSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(UserCreatedEvent), ignoreElements());
  };

  @Saga()
  userUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(UserUpdatedEvent), ignoreElements());
  };

  @Saga()
  userDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(UserDeletedEvent), ignoreElements());
  };
}
