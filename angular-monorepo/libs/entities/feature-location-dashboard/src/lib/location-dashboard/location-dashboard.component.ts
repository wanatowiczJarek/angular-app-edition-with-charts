import { Component, OnInit } from '@angular/core';
import { LocationStats } from 'libs/entities/data-repository/src/lib/model/model';
import { EntityService } from 'libs/entities/data-repository/src/lib/services/entity.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'angular-monorepo-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.scss']
})
export class LocationDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  occupancyChartOptions: Highcharts.Options = {};
  visitsChartOptions: Highcharts.Options = {};
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private entityService: EntityService) {
  }

  ngOnInit() {
    this.entityService.getLocationStats().subscribe(stats => {
      this.setupCharts(stats);
    });
  }

  setupCharts(stats: LocationStats): void {
    this.occupancyChartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Last Week Location Occupancy'
      },
      yAxis: {
        title: {
          text: null
        }
      },
      xAxis: {
        labels: {
          formatter: e => this.weekDays[e.value as number]
        }
      },
      series: [
        {
          data: stats.lastWeekLocationOccupancy, name: 'Occupancy'
        } as Highcharts.SeriesOptionsType
      ]
    };

    this.visitsChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top 5 Employee Visits Last Week'
      },
      xAxis: {
        categories: stats.lastWeekEmployeesVisits.map(e => e.name)
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [
        {
          data: stats.lastWeekEmployeesVisits.map(e => e.visits), name: 'Visits'
        } as Highcharts.SeriesOptionsType
      ],
    };
  }
}
