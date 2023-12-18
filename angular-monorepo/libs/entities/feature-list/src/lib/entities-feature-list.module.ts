import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

const routes: Route[] = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id',
    component: EntityDetailsComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    EntityDetailsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesFeatureListModule { }
