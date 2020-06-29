import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient
    ) { }

  readonly BaseURI = GlobalConstants.apiURL;

  /*
  * MODEL: formModel
  * DESCRIPCIÓN:
  * Es el model del formulario de registro. En él se validan que los campos
  * cumplan con las siguiente validaciones, segun corresponda:
  * -- Campo requerido
  * -- Campo debe ser un email
  * -- Contraseña debe tener al menos 6 caracteres de longitud
  * -- Campo Password y campo ConfirmPassword deben ser iguales
  */
  formModel = this.formBuilder.group({
    UserName : ['', Validators.required],
    Email : ['', [Validators.required, Validators.email]],
    TipoIdentificacion: ['', Validators.required],
    NumeroIdentificacion: ['', Validators.required],
    Direccion: ['', Validators.required],
    Telefono: ['', Validators.required],
    Comercio: ['', Validators.required],
    RazonSocial: ['', Validators.nullValidator],
    Nombre: ['', Validators.required],
    Apellido: ['', Validators.required],
    FechaNacimiento: ['', Validators.required],
    Passwords : this.formBuilder.group({
      Password : ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword : ['', Validators.required]
    }, {
      validator : this.comparePasswords
    })
  });

  /*
  * FUNCION: comparePasswords(fb:FormGroup)
  * DESCRIPCIÓN:
  * Compara los valores introducidos en los campos de contraseñas cuando
  * un usuario se registra. 
  * -- Si los valores de las contraseñas NO coinciden, se crea un error
  *    para ser mostrado en la vista.
  * -- Si las constraseñas SÍ coinciden, no se crea el error.
  */
  comparePasswords(formGroup: FormGroup) {
    let confirmPasswordControl = formGroup.get('ConfirmPassword');
    //passwordMismatch
    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if(formGroup.get('Password').value != formGroup.get('ConfirmPassword').value)
        confirmPasswordControl.setErrors({ passwordMismatch : true });
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  /*
  * FUNCION: registrar()
  * DESCRIPCIÓN:
  * Toma los valores del formulario de registro y los envía mediante un
  * POST request al servidor, usando el URL correspondiente.
  */
  registrar(body) {
    return this.http.post(this.BaseURI+'Authentication/Register', body);
  }

  /*
  * FUNCION: login(body)
  * DESCRIPCIÓN:
  * Envia al servidor los datos del formulario del login mediante un
  * POST request, usando el URL del correspondiente.
  */
  login(body) {
    return this.http.post(this.BaseURI+'Authentication/Login', body);
  }

  /*
  * FUNCION: forgotPasswordEmail(formData)
  * DESCRIPCIÓN:
  * Envia al servidor los datos del formulario (email) del la vista de
  * "Olvidé mi contraseña" mediante un POST request, usando el URL del 
  * correspondiente.
  */
  forgotPasswordEmail(formData) {
    return this.http.post(this.BaseURI+'Authentication/ForgotPasswordEmail', formData);
  }

  /*
  * FUNCION: resetPassword(formData)
  * DESCRIPCIÓN:
  * Envia al servidor el nuevo password confirmado junto al userID y al
  * hashed ResetPasswordToken mediante un POST request, usando el URL del 
  * correspondiente.
  */
  resetPassword(formData) {
    return this.http.post(this.BaseURI+'Authentication/ResetPassword', formData);
  }

  /*
  * FUNCION: confirmAccount(body)
  * DESCRIPCIÓN:
  * Envia al servidor el userID y el hashed confirmationToken mediante 
  * un POST request, usando el URL del correspondiente.
  */
  confirmAccount(body) {
    return this.http.post(this.BaseURI+'Authentication/ConfirmedEmail', body);
  }



  getUserInfo(username){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/InformacionPersona?Usuario='+username, {headers: tokenHeader});
  }

  addUsuario(body){
    return this.http.post(this.BaseURI+'EntityUsuario/Insertar', body);
  }

}
