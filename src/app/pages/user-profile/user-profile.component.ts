import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'
import { EstadoCivil } from 'src/app/models/EstadoCivil.model';
import { Parametro } from 'src/app/models/Parametro.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  _username: string = localStorage.getItem('username');
  _email: string = localStorage.getItem('email');
  _user: any;
  _userParameters: any;

  _hasComercio: boolean = false;
  _editingForm: boolean = true;
  _userHasParameters: boolean = false;
  _viewDatosPersonalesForm: boolean = true;
  _viewConfigurationsForm: boolean = false;
  _viewChangePasswordForm: boolean = false;

  estadosCivilesArray: Array<EstadoCivil> = [];
  parametrosArray: Array<Parametro> = [];

  constructor(
    private service: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }





  formModel = this.formBuilder.group({
    UserName : ['', Validators.required],
    Email : ['', [Validators.required, Validators.email]],
    NumeroIdentificacion: ['', Validators.required],
    Direccion: ['', Validators.required],
    Telefono: ['', Validators.required],
    Nombre: ['', Validators.required],
    Apellido: ['', Validators.required],
    FechaNacimiento: ['', Validators.required],
    RazonSocial: ['', Validators.nullValidator],
    EstadoCivilID: ['', Validators.required]
  });

  parametroFormModel = this.formBuilder.group({
    ParametroID: ['', Validators.required],
    Validacion: ['', Validators.required]
  });

  passwordsFormModel = this.formBuilder.group({
    OldPassword: ['', [Validators.required, Validators.minLength(6)]],
    NewPasswords : this.formBuilder.group({
      Password : ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword : ['', Validators.required]
    }, {
      validator : this.service.comparePasswords
    })
  });





  ngOnInit() {
    this.formModel.get('NumeroIdentificacion').disable();
    this.getUser();
    this.getEstadosCiviles();
    this.getParametros();
    this.getUserParametros();
  }

  getUser() {
    this.service.getUserInfo(this._email).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this._user = res;
        this.loadProfileForm();
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getUserParametros() {
    this.service.getUserParameters(localStorage.getItem('userIntID')).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        if (res.length != 0) {
          this._userHasParameters = true;
          this._userParameters = res;
        }
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getEstadosCiviles() {
    this.service.loadEstadosCiviles().subscribe(
      (res:any) => {
        console.log(res); // res JSON
        res.forEach(estadoCivil => {
          this.estadosCivilesArray.push(new EstadoCivil(
            estadoCivil.idEstadoCivil,
            estadoCivil.descripcion,
            estadoCivil.codigo,
            estadoCivil.estatus
          ));
        });
        console.log(this.estadosCivilesArray);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  getParametros() {
    this.service.loadParametros().subscribe(
      (res:any) => {
        console.log(res); // res JSON
        res.forEach(parametro => {
          this.parametrosArray.push(new Parametro(
            parametro.idParametro,
            parametro.nombre,
            parametro.estatus
          ));
        });
        console.log(this.parametrosArray);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  loadProfileForm() {
    var fechaNacimiento = new Date(
      this._user.persona.fechaNacimiento.year,
      this._user.persona.fechaNacimiento.month,
      this._user.persona.fechaNacimiento.day
      );

    if (this._user.comercio.razonSocial != "") {
      this._hasComercio = true;
    }

    this.formModel.setValue({
      UserName : this._user.result.usuario,
      Email : this._user.result.email,
      NumeroIdentificacion: this._user.tipoIdentificacion.codigo + this._user.result.nroIdentificacion,
      Direccion: this._user.result.direccion,
      Telefono: this._user.result.telefono,
      Nombre: this._user.persona.nombre,
      Apellido: this._user.persona.apellido,
      FechaNacimiento: moment(fechaNacimiento).format('YYYY-MM-DD').toString(),
      RazonSocial: this._user.comercio.razonSocial,
      EstadoCivilID: this._user.estadoCivil.idEstadoCivil
    });
  }

  onSubmit() {
    this.saveUserInfo();
    this.savePersonaComercioInfo();
  }

  onViewConfigurations() {
    this._viewConfigurationsForm = true;
    this._viewChangePasswordForm = true;
    this._viewDatosPersonalesForm = false;
  }

  onViewUserData() {
    this._viewConfigurationsForm = false;
    this._viewChangePasswordForm = false;
    this._viewDatosPersonalesForm = true;
  }

  saveUserInfo() {
    var body = {
      idUsuario: parseInt(localStorage.getItem('userIntID')),
      idTipoUsuario: parseInt(this._user.result.idTipoUsuario),
      idTipoIdentificacion: parseInt(this._user.tipoIdentificacion.idTipoIdentificacion),
      idEntity: localStorage.getItem('userID'),
      usuario: this.formModel.value.Email,
      fechaRegistro: new Date(
        parseInt(this._user.result.fechaRegistro.year),
        parseInt(this._user.result.fechaRegistro.month),
        parseInt(this._user.result.fechaRegistro.day)
        ),
      nroIdentificacion: parseInt(this._user.result.nroIdentificacion),
      email: this.formModel.value.Email,
      telefono: this.formModel.value.Telefono,
      direccion: this.formModel.value.Direccion,
      estatus: 1
    };
    console.log(body);

    this.service.updateUserInfo(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.toastr.success('Sus datos han sido guardados exitosamente','¡Usuario modificado!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  savePersonaComercioInfo() {
    var body = {
      nombre: this.formModel.value.Nombre,
      apellido: this.formModel.value.Apellido,
      telefono: this.formModel.value.Telefono,
      direccion: this.formModel.value.Direccion,
      razonSocial: this.formModel.value.RazonSocial,
      idEstadoCivil: parseInt(this.formModel.value.EstadoCivilID),
      idUsuario: parseInt(localStorage.getItem('userIntID'))
    };
    console.log(body);

    this.service.updatePersonaComercioInfo(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.getUser();
        this.toastr.success('Sus datos han sido guardados exitosamente','¡Datos personales modificado!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }
 
  saveConfigurations() {
    var body = {
      idUsuario: parseInt(localStorage.getItem('userIntID')),
      idParametro: parseInt(this.parametroFormModel.value.ParametroID),
      validacion: this.parametroFormModel.value.Validacion.toString(),
      estatus: 1
    }
    console.log(body);
    this.service.createParametro(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.parametroFormModel.reset();
        this.getUserParametros();
        this.toastr.success('Su parámetro ha sido guardado exitosamente','¡Parámetro establecido!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

  establecerParametro(idParametro, validacion, estatus) {
    var body = {
      idUsuario: parseInt(localStorage.getItem('userIntID')),
      idParametro: parseInt(idParametro),
      validacion: validacion,
      estatus: estatus
    }
    console.log(body);
    this.service.createParametro(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.getUserParametros();
        if (body.estatus = 1) {
          this.toastr.success('Su parámetro ha sido activado exitosamente','¡Parámetro activado!');
        } else {
          this.toastr.success('Su parámetro ha sido inactivado exitosamente','¡Parámetro inactivado!');
        }
      },
      err => {
        console.log(err); // error JSON
      }
    );

  }

  changePassword() {
    var body = {
      idUsuario: localStorage.getItem('userID'),
      resetPasswordToken: this.passwordsFormModel.value.OldPassword,
      newPassword: this.passwordsFormModel.value.NewPasswords.Password
    }
    console.log(body);

    this.service.changePassword(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.passwordsFormModel.reset();
        this.toastr.success('Su contraseña ha sido cambiada exitosamente','¡Contraseña cambiada!');
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }

}
