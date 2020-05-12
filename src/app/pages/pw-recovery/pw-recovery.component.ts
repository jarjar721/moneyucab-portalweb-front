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
        this.toastr.success('Un mensaje ha sido enviado a su email con instrucciones para restablecer su contraseña', '¡Correo enviado!');
        console.log(res);
      },
      err => {
        this.toastr.error('¡Ups! Algo ha sucedido', '¡Ingreso fallido!');
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
  }

}
