import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentCardComponent } from '../../components/payment-card/payment-card.component';

@Component({
  selector: 'app-billeteras',
  templateUrl: './billeteras.component.html',
  styleUrls: ['./billeteras.component.scss']
})
export class BilleterasComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', keyboard: true } );
  }

}
