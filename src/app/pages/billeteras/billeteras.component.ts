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

  addBilletera() {
    //this.tarjetas.push(new Tarjeta());
  }

}
