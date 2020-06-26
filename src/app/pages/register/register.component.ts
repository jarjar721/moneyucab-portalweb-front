import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private service: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

    formModel = this.formBuilder.group({
      UserName : ['', Validators.required],
      Email : ['', [Validators.required, Validators.email]],
      TipoIdentificacion: ['', Validators.required],
      NumeroIdentificacion: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      RazonSocial: ['', Validators.nullValidator],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      EstadoCivil: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Passwords : this.formBuilder.group({
        Password : ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword : ['', Validators.required]
      }, {
        validator : this.service.comparePasswords
      })
    });

    comercioChecked: boolean;

  ngOnInit() {
    this.formModel.reset();
    this.comercioChecked = false;
  }

  onCheckBoxChange(e) {
    if(e.target.checked) {
      this.comercioChecked = true;
    } else {
      this.comercioChecked = false;
    }
  }

  onSubmit(){
    var fechaRegistro = new Date();
    var fechaNacimiento = new Date(this.formModel.value.FechaNacimiento);
    var razonSocialString = this.formModel.value.RazonSocial;
    if ( razonSocialString == null) {
      razonSocialString = "";
    }

    var body = {
      usuario : this.formModel.value.UserName,
      email : this.formModel.value.Email,
      password : this.formModel.value.Passwords.Password,
      idTipoUsuario: 1,
      idTipoIdentificacion: parseInt(this.formModel.value.TipoIdentificacion),
      idEstadoCivil: parseInt(this.formModel.value.EstadoCivil),
      diaRegistro: fechaRegistro.getDay(),
      mesRegistro: fechaRegistro.getMonth(),
      anoRegistro: fechaRegistro.getFullYear(),
      nroIdentificacion: this.formModel.value.NumeroIdentificacion,
      telefono: this.formModel.value.Telefono.toString(),
      direccion: this.formModel.value.Direccion,
      estatus: 1,
      nombre: this.formModel.value.Nombre,
      apellido: this.formModel.value.Apellido,
      diaNacimiento: fechaNacimiento.getUTCDay(),
      mesNacimiento: fechaNacimiento.getUTCMonth(),
      anoNacimiento: fechaNacimiento.getUTCFullYear(),
      comercio: this.comercioChecked,
      razonSocial: razonSocialString
    };
    console.log(body);

    this.spinner.show();
    this.service.registrar(body).subscribe(
      (res : any) => {
        console.log(res);
        
        setTimeout(() => {
          this.spinner.hide();
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg

        this.toastr.success('Un mensaje de confirmación ha sido enviado a su email', '¡Registrado exitosamente!');
        this.router.navigateByUrl('/login');
      },
      err => {
        this.spinner.hide();
        console.log(err);

        if(err.status == 400) {
          if (err.error.codigo == 17) {
            this.toastr.error(err.error.error, '¡Ya existe este usuario!');
          }
          // Aca van validaciones de numero de identificacio y numero de telefono duplicado
        } else {
          this.toastr.error('¡Ups! Algo ha sucedido', '¡Registro fallido!');
        }

      }
    );
  }

}
