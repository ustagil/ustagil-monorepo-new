import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { OrganizationCreatedEvent } from './create-organization/organization-created.event';
import { OrganizationDeletedEvent } from './delete-organization/organization-deleted.event';
import { OrganizationUpdatedEvent } from './update-organization/organization-updated.event';

@Injectable()
export class OrganizationSagas {
  @Saga()
  organizationCreated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(OrganizationCreatedEvent), ignoreElements());
  };

  @Saga()
  organizationUpdated = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(OrganizationUpdatedEvent), ignoreElements());
  };

  @Saga()
  organizationDeleted = (events$: Observable<any>): Observable<never> => {
    return events$.pipe(ofType(OrganizationDeletedEvent), ignoreElements());
  };
}
