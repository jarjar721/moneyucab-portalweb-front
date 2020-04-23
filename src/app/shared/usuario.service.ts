import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  //Si corres el servidor en Visual Studio
  //readonly BaseURI = 'http://localhost:49683/api/';
  //Si corres el servidor en consola usando "dotnet run"
  readonly BaseURI = 'http://localhost:5000/api/';

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', [Validators.required, Validators.email]],
    Passwords : this.fb.group({
      Password : ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword : ['', Validators.required]
    }, {
      validator : this.comparePasswords
    })
  });


  comparePasswords(fb:FormGroup) {
    let confirmPasswordControl = fb.get('ConfirmPassword');
    //passwordMismatch
    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if(fb.get('Password').value != fb.get('ConfirmPassword').value)
        confirmPasswordControl.setErrors({ passwordMismatch : true });
      else
        confirmPasswordControl.setErrors(null);
    }
  }


  registrar(){
    var body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      Password : this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'Usuario/Register', body);
  }


  login(formData){
    return this.http.post(this.BaseURI+'Usuario/Login', formData);
  }


}
