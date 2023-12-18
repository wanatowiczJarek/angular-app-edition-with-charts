import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';

const routes: Route[] = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesFeatureListModule { }
