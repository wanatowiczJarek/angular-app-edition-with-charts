import { Component, OnInit } from '@angular/core';
import { EntityService } from './../../../../data-repository/src/lib/services/entity.service';
import { EntityListItem } from 'libs/entities/data-repository/src/lib/model/model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'angular-monorepo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  entityList: EntityListItem[] = [];

  constructor(private entityService: EntityService) {
  }

  ngOnInit(): void {
    this.entityService.getEntityList().pipe(
      catchError(error => {
        if (error.status === 403) {
          console.error('Error 403: Access forbidden');
        }
        return of([]);
      })
    )
      .subscribe(list => {
        this.entityList = list;
      })
  }
}
