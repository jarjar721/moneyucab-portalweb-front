import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration-wizard',
  templateUrl: './registration-wizard.component.html',
  styleUrls: ['./registration-wizard.component.scss']
})
export class RegistrationWizardComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.toastr.success('Un mensaje de confirmación ha sido enviado a su email', '¡Registrado exitosamente!');
  }

}
