import { Component, OnInit } from '@angular/core';
import { EntityService } from './../../../../data-repository/src/lib/services/entity.service';
import { EntityListItem } from 'libs/entities/data-repository/src/lib/model/model';

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
    this.entityService.getEntityList().subscribe(list => {

      this.entityList = list;
    });
  }
}
