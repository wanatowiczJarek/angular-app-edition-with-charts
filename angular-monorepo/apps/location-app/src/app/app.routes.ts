import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'entity/homepage',
    loadChildren: () => import('@angular-monorepo/entities/feature-homepage').then(m => m.EntitiesFeatureHomepageModule)
  },
  {
    path: 'entity/list',
    loadChildren: () => import('@angular-monorepo/entities/feature-list').then(m => m.EntitiesFeatureListModule)
  },
  {
    path: 'dashboards/location',
    loadChildren: () => import('@angular-monorepo/entities/feature-location-dashboard').then(m => m.EntitiesFeatureLocationDashboardModule)
  },
  {
    path: '',
    redirectTo: '/entity/homepage',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/entity/homepage'
  }
];
