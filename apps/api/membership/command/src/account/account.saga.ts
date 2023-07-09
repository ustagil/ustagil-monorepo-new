import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { AccountCreatedEvent } from './create-account/account-created.event';
import { AccountDeletedEvent } from './delete-account/account-deleted.event';
import { AccountUpdatedEvent } from './update-account/account-updated.event';

@Injectable()
export class AccountSagas {
  @Saga()
  accountCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(AccountCreatedEvent), ignoreElements());
  };

  @Saga()
  accountUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(AccountUpdatedEvent), ignoreElements());
  };

  @Saga()
  accountDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(AccountDeletedEvent), ignoreElements());
  };
}
