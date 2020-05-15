import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/es'; // Para usar Moment.js en español

// Services
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private service: UsuarioService, 
    private router: Router, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) {}

  formModel = {
    Email : '',
    Password : ''
  }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    this.service.login(form.value).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        localStorage.setItem('token', res.token);

        setTimeout(() => {
          this.spinner.hide();
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
        
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.spinner.hide(); // Al retornar error, el spinner se esconde inmediatamente
        console.log(err); // error JSON

        if(err.status == 400) {
          if (err.error.key == "UnknownUser") {
            this.toastr.error(err.error.message, '¡Usuario desconocido!');
          }
          if (err.error.key == "WrongPassword") {
            this.toastr.error(err.error.message, '¡Credenciales inválidos!');
            this.toastr.warning("Intentos restantes antes de bloquear su cuenta: " + err.error.remainingAttempts, "Intento fallido");
          }
          if (err.error.key == "UserLockedOut") {
            moment().locale('es');
            this.toastr.error(err.error.message + " Su cuenta será desbloqueada en " + moment(err.error.lockoutDateTime).toNow(true), '¡Cuenta bloqueada!');
          }
        } else {
          this.toastr.error('¡Ups! Algo ha sucedido', '¡Ingreso fallido!');
        }

      }
    );
  }

  ngOnDestroy() {
  }

}
