import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Tarjeta } from 'src/app/models/Tarjeta.model';

@Component({
  selector: 'app-billeteras',
  templateUrl: './billeteras.component.html',
  styleUrls: ['./billeteras.component.scss']
})
export class BilleterasComponent implements OnInit {

  tarjetas: Array<Tarjeta> = [];
  cuentas: Array<Tarjeta> = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content, { size: 'lg', keyboard: true } );
  }

  addTarjeta(event) {
    this.modalService.dismissAll();
    console.log(event);
    this.tarjetas.push(new Tarjeta(
      event.cardNumber,
      event.cardHolder,
      event.tipoTarjeta,
      event.ccv,
      event.expirationMonth,
      event.expirationYear,
      event.bancoEmisor
      ));
    console.log(this.tarjetas);
  }

}
