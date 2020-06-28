import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.component.html',
  styleUrls: ['./recargas.component.scss']
})
export class RecargasComponent implements OnInit {

  _saldoMonedero: number = 0;
  _userIntID: number = parseInt(localStorage.getItem('userIntID'));

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.getSaldo();
  }

  getSaldo() {
    this.service.getSaldoMonedero(this._userIntID).subscribe(
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
