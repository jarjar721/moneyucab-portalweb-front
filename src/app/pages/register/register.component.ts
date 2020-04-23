import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.registrar().subscribe(
      (res : any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Ahora puede ingresar al Portal', '¡Registrado exitosamente!');
        } else {
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
