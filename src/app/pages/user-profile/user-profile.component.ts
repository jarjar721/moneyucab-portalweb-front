import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'
import { EstadoCivil } from 'src/app/models/EstadoCivil.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  _username: string = localStorage.getItem('username');
  _user: any;
  _hasComercio: boolean = false;
  _editingForm: boolean = false;
  _viewDatosPersonalesForm: boolean = true;
  _viewParametrosForm: boolean = false;
  _viewChangePasswordForm: boolean = false;

  estadosCivilesArray: Array<EstadoCivil> = [];

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

  ngOnInit() {
    this.formModel.disable();
    this.getUser();
    this.getEstadosCiviles();
  }

  getUser() {
    this.service.getUserInfo(this._username).subscribe(
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
    this.formModel.disable();
    this._editingForm = false;
    this.saveUserInfo();
    this.savePersonaComercioInfo();
  }

  onEdit() {
    this._editingForm = true;
    this.formModel.enable();
    this.formModel.get('NumeroIdentificacion').disable();
  }

  saveUserInfo() {
    var body = {
      idUsuario: parseInt(localStorage.getItem('userID')),
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
      idUsuario: parseInt(localStorage.getItem('userID'))
    };

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
 
}
