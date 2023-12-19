import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Route[] = [
  {
    path: '',
    component: LocationDashboardComponent
  }
];

@NgModule({
  declarations: [
    LocationDashboardComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesFeatureLocationDashboardModule { }
