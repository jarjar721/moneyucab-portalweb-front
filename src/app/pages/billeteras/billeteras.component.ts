import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Models
import { Tarjeta } from 'src/app/models/Tarjeta.model';
import { Cuenta } from 'src/app/models/Cuenta.model';
import { TipoTarjeta } from 'src/app/models/TipoTarjeta.model';
import { TipoCuenta } from 'src/app/models/TipoCuenta.model';
import { Banco } from 'src/app/models/Banco.model';

//Services
import { DashboardService } from 'src/app/shared/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-billeteras',
  templateUrl: './billeteras.component.html',
  styleUrls: ['./billeteras.component.scss']
})
export class BilleterasComponent implements OnInit {

  userTarjetas: Array<Tarjeta> = [];
  selectedTarjetaID: Number;

  userCuentas: Array<Cuenta> = [];
  selectedCuentaID: Number;

  bancosArray: Array<Banco> = [];
  tipoTarjetasArray: Array<TipoTarjeta> = [];
  tipoCuentasArray: Array<TipoCuenta> = [];

  constructor(
    private modalService: NgbModal,
    private service: DashboardService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
    ) { }

    cuentaFormModel = this.formBuilder.group({
      NumeroCuenta : ['', Validators.required],
      TipoCuentaID : ['', [Validators.required, Validators.email]],
      BancoID: ['', Validators.required]
    });

  ngOnInit() {
    this.getBancos();
    this.getTipoCuentas();
    this.getTipoTarjetas();
    this.getUserCuentas();
    this.getUserTarjetas();
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', keyboard: true } );
  }

  close() {
    this.modalService.dismissAll();
  }

  getBancos() {
    this.service.loadBancos().subscribe(
      (res:any) => {
        console.log(res); // res JSON
        res.forEach(banco => {
          this.bancosArray.push(new Banco(
            banco.idBanco,
            banco.nombre,
            banco.estatus
            ));
        });
        console.log(this.bancosArray);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }
  
  getTipoTarjetas() {
    this.service.loadTipoCuentas().subscribe(
      (res:any) => {
        console.log(res); // res JSON
        res.forEach(tipoTarjeta => {
          this.tipoTarjetasArray.push(new TipoTarjeta(
            tipoTarjeta.idTipoTarjeta,
            tipoTarjeta.descripcion,
            tipoTarjeta.estatus
          ));
        });
        console.log(this.tipoTarjetasArray);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getTipoCuentas() {
    this.service.loadTipoCuentas().subscribe(
      (res:any) => {
        console.log(res); // res JSON
        res.forEach(tipoCuenta => {
          this.tipoCuentasArray.push(new TipoCuenta(
            tipoCuenta.idTipoCuenta,
            tipoCuenta.descripcion,
            tipoCuenta.estatus
          ));
        });
        console.log(this.tipoCuentasArray);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getUserTarjetas() {
    this.service.loadUserTarjetas(localStorage.getItem('userIntID')).subscribe(
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
              tarjeta.estatus
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
    this.service.loadUserCuentas(localStorage.getItem('userIntID')).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        console.log(res.result);
        this.userCuentas = []; //Vaciar antes de llenar
        res.result.forEach(cuenta => {
          this.userCuentas.push(new Cuenta(
            cuenta._idCuenta,
            cuenta._numero
          ));
        });
        console.log(this.userCuentas);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  addTarjeta(event) {
    this.modalService.dismissAll();
    console.log(event);
    this.getUserTarjetas();
    this.toastr.success('Ahora podrá realizar operaciones con su tarjeta','¡Tarjeta afiliada!');
    console.log(this.userTarjetas);
  }

  onCuentaSubmit() {
    var body = {
      idUsuario: parseInt(localStorage.getItem('userIntID')),
      numero: this.cuentaFormModel.value.NumeroCuenta.toString(),
      idTipoCuenta: parseInt(this.cuentaFormModel.value.TipoCuentaID),
      idBanco: parseInt(this.cuentaFormModel.value.BancoID)
    };

    this.service.createCuenta(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.getUserCuentas();
        this.toastr.success('Ahora podrá realizar operaciones con su cuenta bancaria','¡Cuenta bancaria afiliada!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  desafiliarTarjeta(idTarjeta) {
    this.service.deleteTarjeta(idTarjeta).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.getUserTarjetas();
        this.toastr.success('Su tarjeta de pago ha sido desvinculada','¡Tarjeta de pago desafiliada!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  desafiliarCuenta(idCuenta) {
    this.service.deleteCuenta(idCuenta).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.getUserCuentas();
        this.toastr.success('Su cuenta bancaria ha sido desvinculada','¡Cuenta bancaria desafiliada!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

}
