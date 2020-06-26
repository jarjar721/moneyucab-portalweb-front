import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'

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
    RazonSocial: ['', Validators.nullValidator]
  });

  ngOnInit() {
    this.formModel.disable();
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
      NumeroIdentificacion: this._user.result.nroIdentificacion,
      Direccion: this._user.result.direccion,
      Telefono: this._user.result.telefono,
      Nombre: this._user.persona.nombre,
      Apellido: this._user.persona.apellido,
      FechaNacimiento: moment(fechaNacimiento).format('MM DD YYYY').toString(),
      RazonSocial: this._user.comercio.razonSocial
    });
  }

  onSubmit() {
    this.formModel.disable();
    this._editingForm = false;
  }

  onEdit() {
    this._editingForm = true;
    this.formModel.enable();
  }
 
}
