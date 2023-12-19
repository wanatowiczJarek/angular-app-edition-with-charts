import { Component } from '@angular/core';
import { EntityService } from 'libs/entities/data-repository/src/lib/services/entity.service';

@Component({
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private service: EntityService) {
    this.service.getEntityList().subscribe(list => {
      console.log('list', list);
    })
  }

  title = 'location-app';

  items = [
    {
      label: 'Entities',
      icon: 'pi pi-fw pi-compass',
      items: [
        {
          label: 'Homepage',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: 'entity/homepage'
        },
        {
          label: 'List',
          icon: 'pi pi-fw pi-list',
          routerLink: 'entity/list'
        },
      ]
    },
    {
      label: 'Dashboards',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'Location Dashboard',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: 'dashboards/location'
        },
      ]
    },
  ];

}
