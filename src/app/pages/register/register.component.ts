import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UsuarioService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.registrar().subscribe(
      (res : any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                //username is already taken
                break;
              case 'DuplicateEmail':
                //email is already taken
                break;

              default:
                //registration has failed
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
