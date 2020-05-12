import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    private spinner: NgxSpinnerService
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
        localStorage.setItem('token', res.token);

        setTimeout(() => {
          this.spinner.hide();
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
        
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.spinner.hide(); // Al retornar error, el spinner se esconde inmediatamente
        
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
