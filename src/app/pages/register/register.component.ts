import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private service: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.spinner.show();
    this.service.registrar().subscribe(
      (res : any) => {
        console.log(res);
        
        setTimeout(() => {
          this.spinner.hide();
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
        
        this.router.navigateByUrl('/registration-wizard');
      },
      err => {
        this.spinner.hide();
        console.log(err);

        if(err.status == 400) {
          if (err.error.key == "DuplicateUserName") {
            this.toastr.error(err.error.message, '¡Username ya ha sido tomado!');
          }
          if (err.error.key == "DuplicateEmail") {
            this.toastr.error(err.error.message, '¡Correo electrónico ya ha sido tomado!');
          }
        } else {
          this.toastr.error('¡Ups! Algo ha sucedido', '¡Registro fallido!');
        }

      }
    );
  }

}
