import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/shared/dashboard.service';

import { Tarjeta } from 'src/app/models/Tarjeta.model';
import { Cuenta } from 'src/app/models/Cuenta.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperacionMonedero } from 'src/app/models/OperacionMonedero.model';
import * as moment from 'moment';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.component.html',
  styleUrls: ['./recargas.component.scss']
})
export class RecargasComponent implements OnInit {

  _saldoMonedero: number = 0;
  _userIntID: number = parseInt(localStorage.getItem('userIntID'));

  userTarjetas: Array<Tarjeta> = [];
  selectedTarjetaID: Number;

  userCuentas: Array<Cuenta> = [];
  selectedCuentaID: Number;

  userOperaciones: Array<OperacionMonedero> = [];
  selectedOperacionID: Number;

  _recargarConTarjeta: boolean = false;
  _recargarConCuenta: boolean = false;

  constructor(
    private service: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }

  recargaFormModel = this.formBuilder.group({
    Monto: ['', Validators.required]
  });

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
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  isTarjeta(tarjetaID) {
    this._recargarConTarjeta = true;
    this._recargarConCuenta = false;
    this.selectedTarjetaID = tarjetaID;
  }

  isCuenta(cuentaID) {
    this._recargarConTarjeta = false;
    this._recargarConCuenta = true;
    this.selectedCuentaID = cuentaID;
  }

  recargarSaldo() {
    if (this._recargarConTarjeta) {
      this.recargarWithTarjeta();
    } else {
      this.recargarWithCuenta();
    }
  }

  recargarWithCuenta() {
    var body = {
      idUsuarioReceptor: this._userIntID,
      idMedioPaga: this.selectedCuentaID,
      monto: parseInt(this.recargaFormModel.value.Monto),
		  idOperacion: 2
    }
    console.log(body);

    this.service.recargarConCuenta(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.recargaFormModel.reset();
        this.toastr.success('Su recarga ha sido procesada exitosamente','¡Recarga procesada!');
        this.getSaldo();
        this.loadOperacionesMonedero();
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  recargarWithTarjeta() {
    var body = {
      idUsuarioReceptor: this._userIntID,
      idMedioPaga: this.selectedTarjetaID,
      monto: parseInt(this.recargaFormModel.value.Monto),
		  idOperacion: 2
    }
    console.log(body);

    this.service.recargarConTarjeta(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.recargaFormModel.reset();
        this.toastr.success('Su recarga ha sido procesada exitosamente','¡Recarga procesada!');
        this.getSaldo();
        this.loadOperacionesMonedero();
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

}
