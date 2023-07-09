import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { MembershipCreatedEvent } from './create-membership/membership-created.event';
import { MembershipDeletedEvent } from './delete-membership/membership-deleted.event';
import { MembershipUpdatedEvent } from './update-membership/membership-updated.event';

@Injectable()
export class MembershipSagas {
  @Saga()
  membershipCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(MembershipCreatedEvent), ignoreElements());
  };

  @Saga()
  membershipUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(MembershipUpdatedEvent), ignoreElements());
  };

  @Saga()
  membershipDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(MembershipDeletedEvent), ignoreElements());
  };
}
