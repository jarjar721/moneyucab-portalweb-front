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
export class LoginComponent implements OnInit {

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
  comercioChecked: boolean = false;

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  onCheckBoxChange(e) {
    if(e.target.checked) {
      this.comercioChecked = true;
    } else {
      this.comercioChecked = false;
    }
  }

  onSubmit(form: NgForm) {
    var body = {
      usuario: "",
      email: this.formModel.Email,
      password: this.formModel.Password,
      comercio: this.comercioChecked
    };
    console.log(body);
    this.spinner.show();
    this.service.login(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        localStorage.setItem('token', res.result.token);
        localStorage.setItem('userID', res.result.userID);
        localStorage.setItem('username', res.result.username);
        localStorage.setItem('email', res.result.email);
        this.getUserInfo();
      },
      err => {
        this.spinner.hide(); // Al retornar error, el spinner se esconde inmediatamente
        console.log(err); // error JSON

        if(err.status == 400) {
          if (err.error.codigo == 11) {
            this.toastr.error(err.error.error, '¡Usuario desconocido!');
          }
          if (err.error.codigo == 13) {
            this.toastr.error(err.error.error, '¡Credenciales inválidos!');
          }
          if (err.error.codigo == 12) {
            moment().locale('es');
            this.toastr.error(err.error.error, '¡Cuenta bloqueada!');
          }
        } else {
          this.toastr.error('¡Ups! Algo ha sucedido', '¡Ingreso fallido!');
        }

      }
    );
  }

  getUserInfo() {
    this.service.getUserInfo(localStorage.getItem('username')).subscribe(
      (res:any) => {
        localStorage.setItem('userIntID', res.result.idUsuario);

        setTimeout(() => {
          this.spinner.hide();
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
        
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.log(err);
      }
    );
  }

}
