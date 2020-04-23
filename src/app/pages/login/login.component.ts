import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formModel = {
    //UserName : '',  En caso de que el login sea con username
    Email : '',
    Password : ''
  }

  constructor(private service: UsuarioService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        if(err.status == 400) {
          this.toastr.error('Email o contraseña inválida', '¡Credenciales inválidos!');
        } else {
          this.toastr.error('¡Ups! Algo ha sucedido', '¡Ingreso fallido!');
          console.log(err);
        }
      }
    );
  }

  ngOnDestroy() {
  }

}
