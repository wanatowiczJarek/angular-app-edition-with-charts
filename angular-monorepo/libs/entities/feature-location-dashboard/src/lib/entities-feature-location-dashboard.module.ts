import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: LocationDashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesFeatureLocationDashboardModule { }
