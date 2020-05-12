import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    ) { }

  userID: string;
  ResetPasswordToken: string;

  formModel = this.formBuilder.group({
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: this.service.comparePasswords
    })
  });
  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userID = params.get('userID');
      this.ResetPasswordToken = params.get('resetPasswordToken');
    })
  }


  onSubmit() {
    var body = {
      userID: this.userID,
      resetPasswordToken: this.ResetPasswordToken,
      newPassword: this.formModel.value.Passwords.Password
    };
    this.service.resetPassword(body).subscribe(
      (res : any) => {
        console.log(res);
        
        setTimeout(() => {
          this.toastr.success('Ingrese al portal con su contraseña nueva', '¡Cambio exitoso!');
        }, 5000); // Al retornar el resultado, el spinner se esconde luego de 3seg
        
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        this.toastr.error('¡Ups! Algo ha sucedido', '¡Restablecimiento fallido!');
        this.formModel.reset();
      }
    );
  }

}
