import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// Models
import { Tarjeta } from 'src/app/models/Tarjeta.model';
import { Cuenta } from 'src/app/models/Cuenta.model';
import { OperacionMonedero } from 'src/app/models/OperacionMonedero.model';
import { OperacionTarjeta } from 'src/app/models/OperacionTarjeta.model';
import { OperacionCuenta } from 'src/app/models/OperacionCuenta.model';

//Services
import { DashboardService } from 'src/app/shared/dashboard.service';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {

  _saldoMonedero: number = 0;
  _userIntID: number = parseInt(localStorage.getItem('userIntID'));

  userTarjetas: Array<Tarjeta> = [];
  userCuentas: Array<Cuenta> = [];

  userOperaciones: Array<OperacionMonedero> = [];
  userOperacionesTarjetas: Array<OperacionTarjeta> = [];
  userOperacionesCuentas: Array<OperacionCuenta> = [];

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.getSaldo();
    this.getUserTarjetas();
    this.getUserCuentas();
    this.loadOperacionesMonedero();
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

  loadOperacionesMonedero() {
    this.service.getOperacionesMonedero(this._userIntID).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.userOperaciones = [];
        res.forEach(operacion => {
          let fecha = new Date(
            operacion.fecha.year,
            operacion.fecha.month,
            operacion.fecha.day
            );
          this.userOperaciones.push(new OperacionMonedero(
            operacion.idOperacionMonedero,
            operacion.monto,
            moment(fecha).format('DD/MM/YYYY').toString(),
            operacion.referencia
          ));
        });
        console.log(this.userOperaciones);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getUserTarjetas() {
    this.service.loadUserTarjetas(this._userIntID).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.userTarjetas = []; //Vaciar antes de llenar
        res.forEach(tarjeta => {
          if(tarjeta.estatus != 2) {
            this.userTarjetas.push(new Tarjeta(
              tarjeta.idTarjeta,
              tarjeta.numero,
              tarjeta.cvc,
              tarjeta.fechaVencimiento.month,
              tarjeta.fechaVencimiento.year,
              tarjeta.estatus,
              tarjeta.infoAdicional.tipoTarjeta.descripcion,
              tarjeta.infoAdicional.banco.nombre
            ));
          }
        });
        console.log(this.userTarjetas);
        this.getHistorialTarjetas();
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getUserCuentas() {
    this.service.loadUserCuentas(this._userIntID).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.userCuentas = []; //Vaciar antes de llenar
        res.forEach(cuenta => {
          if(cuenta.infoAdicional._tipoCuenta.idTipoCuenta != 3) {
            this.userCuentas.push(new Cuenta(
              cuenta._idCuenta,
              cuenta._numero,
              cuenta.infoAdicional._tipoCuenta.descripcion,
              cuenta.infoAdicional._banco.nombre
            ));
          }
        });
        console.log(this.userCuentas);
        this.getHistorialCuentas();
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getHistorialTarjetas() {
    this.userTarjetas.forEach(tarjeta => {
      this.service.getOperacionesTarjeta(tarjeta.TarjetaID).subscribe(
        (res:any) => {
          if (res.length != 0) {
            res.forEach(operacion => {

              let fecha = new Date(
                operacion.fecha.year,
                operacion.fecha.month,
                operacion.fecha.day
                );
  
              var descripcion = tarjeta.Banco + ' - ' + tarjeta.TipoTarjeta;
  
              this.userOperacionesTarjetas.push(new OperacionTarjeta(
                operacion.idOperacion,
                descripcion,
                operacion.monto,
                moment(fecha).format('DD/MM/YYYY').toString(),
                operacion.referencia
              ));
  
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    });
    console.log(this.userOperacionesTarjetas);
  }

  getHistorialCuentas() {
    this.userCuentas.forEach(cuenta => {
      this.service.getOperacionesCuenta(cuenta.CuentaID).subscribe(
        (res:any) => {
          if (res.length != 0) {
            res.forEach(operacion => {

              let fecha = new Date(
                operacion.fecha.year,
                operacion.fecha.month,
                operacion.fecha.day
                );
  
              var descripcion = cuenta.Banco + ' - ' + cuenta.TipoCuenta;
  
              this.userOperacionesCuentas.push(new OperacionCuenta(
                operacion.idOperacion,
                descripcion,
                operacion.monto,
                moment(fecha).format('DD/MM/YYYY').toString(),
                operacion.referencia
              ));
  
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    });
    console.log(this.userOperacionesCuentas);
  }

}
