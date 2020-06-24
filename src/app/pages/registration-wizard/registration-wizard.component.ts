import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-wizard',
  templateUrl: './registration-wizard.component.html',
  styleUrls: ['./registration-wizard.component.scss']
})
export class RegistrationWizardComponent implements OnInit {

  UserID: String;
  UserName: String;
  UserEmail: String;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private service: UsuarioService,
    private formBuilder: FormBuilder
  ) { }

  usuarioModel = this.formBuilder.group({
    TipoIdentificacion: ['', Validators.required],
    NumeroIdentificacion: ['', Validators.required],
    Direccion: ['', Validators.required],
    Telefono: ['', Validators.required]
  });

  ngOnInit() {
    this.toastr.success('Un mensaje de confirmación ha sido enviado a su email', '¡Registrado exitosamente!');
    this.UserID = localStorage.getItem('userID');
    this.UserName = localStorage.getItem('username');
    this.UserEmail = localStorage.getItem('email');
  }

  onSubmit() {
    var body = {
      idTipoUsuario: 1,
      idTipoIdentificacion: parseInt(this.usuarioModel.value.TipoIdentificacion),
      idEntity: this.UserID,
      usuario: this.UserName,
      fechaRegistro: new Date(),
      nroIdentificacion: this.usuarioModel.value.NumeroIdentificacion,
      email: this.UserEmail,
      telefono: this.usuarioModel.value.Telefono.toString(),
      direccion: this.usuarioModel.value.Direccion,
      estatus: 1
    };
    console.log(body);
    this.service.addUsuario(body).subscribe(
      (res : any) => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.log(err);
        
      }
    );
    
  }

}
