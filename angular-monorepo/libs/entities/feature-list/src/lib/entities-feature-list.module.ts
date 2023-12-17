import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Route[] = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesFeatureListModule { }
