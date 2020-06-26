import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pw-recovery',
  templateUrl: './pw-recovery.component.html',
  styleUrls: ['./pw-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {
  
  constructor(
    private service: UsuarioService, 
    private router: Router, 
    private toastr: ToastrService
  ) {}

  formModel = {
    Email : ''
  }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(form: NgForm) {
    this.service.forgotPasswordEmail(form.value).subscribe(
      (res:any) => {
        console.log(res);

        if (res.key == "ForgotPasswordEmailSent") {
          this.toastr.success(res.message, '¡Correo enviado!');
        }

      },
      err => {
        console.log(err); // error JSON

        if(err.status == 400) {
          if (err.error.codigo == 11) {
            this.toastr.error(err.error.error, '¡Usuario desconocido!');
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
