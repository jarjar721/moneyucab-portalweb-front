import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  _username: string = localStorage.getItem('username');
  _user: any;
  _saldoMonedero: number = 0;

  constructor(
    private service: DashboardService
  ) { }

  ngOnInit() {

    this.loadUser();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  loadUser() {
    this.service.getUserInfo(this._username).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this._user = res;
        localStorage.setItem('userIntID', this._user.result.idUsuario);
        this.getSaldo(this._user.result.idUsuario);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getSaldo(userIntID) {
    this.service.getSaldoMonedero(userIntID).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this._saldoMonedero = res;
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

}
