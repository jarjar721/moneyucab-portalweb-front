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
        if (res.succeeded) {

          setTimeout(() => {
            this.spinner.hide();
          }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
          
          this.router.navigateByUrl('/registration-wizard');
        } else {

          setTimeout(() => {
            this.spinner.hide();
          }, 1500); // Al retornar el resultado, el spinner se esconde luego de 3seg
          
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                  this.toastr.error('Ingrese un username distinto', '¡Username ya existe!');
                break;
              case 'DuplicateEmail':
                  this.toastr.error('Ingrese un correo electrónico distinto', '¡Correo electrónico ya existe!');
                break;

              default:
                  this.toastr.error('¡Ups! Algo ha sucedido', '¡Registro fallido!');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
        this.toastr.error('¡Ups! Algo ha sucedido', '¡Registro fallido!');
      }
    );
  }

}
