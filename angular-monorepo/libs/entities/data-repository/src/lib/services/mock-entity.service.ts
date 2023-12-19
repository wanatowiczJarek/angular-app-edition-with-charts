import { Injectable } from '@angular/core';
import { Employee, EntityDetails, EntityListItem, EntityType, EntityUpdateDto, GetEntityListParams, LocationStats } from "../model/model";
import { Observable, mergeMap, of, switchMap, throwError, timer } from 'rxjs';

@Injectable()
export class MockEntityService {

  delayWithRandomError<T>(): (source: Observable<T>) => Observable<T> {
    const delayMs = 1000;
    const errorProbability = 0.1;

    return (source: Observable<T>) =>
      timer(delayMs).pipe(
        mergeMap(() => {
          if (Math.random() < errorProbability) {
            return throwError({ status: 403, message: 'Forbidden' });
          }

          return source;
        })
      );
  }

  entities: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    }
  ];

  entityTypes: EntityType[] = [
    { id: 'n1t', name: 'Nurse' },
    { id: 'n2t', name: 'Security' }
  ];

  lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  lastWeekVisitsLog: Employee[] = [
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id5', name: 'Rachel Gray' },
    { id: 'id6', name: 'Alexis Morales' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
  ];


  getEntityList(getEntityListParams?: GetEntityListParams): Observable<EntityListItem[]> {
    return of(this.entities.map(entity => {
      const { attributes, ...entityListItem } = entity;

      return entity;
    })).pipe(
      this.delayWithRandomError()
    );
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    return of(this.entities).pipe(
      switchMap(entities => {
        const foundEntity = entities.find(entity => entity.entityId === entityId);

        if (!foundEntity) {
          return throwError(new Error('Entity not found'));
        }

        return of(foundEntity);
      }),
      this.delayWithRandomError()
    );
  }

  updateEntity(entityUpdateDto: EntityUpdateDto, entityId: string): Observable<EntityDetails> {
    return of({
      entityId: '',
      trackingId: '',
      name: '',
      entityType: '',
      entityStatus: '',
      isActive: false,
      attributes: [],
    }).pipe(
      this.delayWithRandomError()
    );
  }

  getEntityTypes(): Observable<EntityType[]> {
    return of(this.entityTypes).pipe(
      this.delayWithRandomError()
    );
  }

  getLocationStats(): Observable<LocationStats> {
    const employeeVisitCounts = this.lastWeekVisitsLog.reduce((acc, employee) => {
      acc[employee.name] = (acc[employee.name] || 0) + 1;

      return acc;
    }, {} as { [key: string]: number });

    const lastWeekEmployeesVisits: { name: string, visits: number }[] = Object.entries(employeeVisitCounts)
      .map(([name, visits]) => ({ name, visits: visits as number }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);

    return of({
      lastWeekLocationOccupancy: this.lastWeekLocationOccupancy,
      lastWeekEmployeesVisits
    }).pipe(
      this.delayWithRandomError()
    );
  }
}
