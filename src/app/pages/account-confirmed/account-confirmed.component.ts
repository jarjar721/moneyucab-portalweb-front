import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.scss']
})
export class AccountConfirmedComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UsuarioService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  userID: string;
  confirmationToken: string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userID = params.get('userID');
      this.confirmationToken = params.get('confirmationToken');
    })
    this.confirmAccount();
  }

  confirmAccount() {
    var body = {
      idUsuario: this.userID,
      confirmationToken: this.confirmationToken,
    };
    this.service.confirmAccount(body).subscribe(
      (res : any) => {
        console.log(res);
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000); // Al retornar el resultado, el spinner se esconde luego de 3seg
      },
      err => {
        console.log(err);
        this.toastr.error('¡Ups! Algo ha sucedido', '¡Restablecimiento fallido!');
      }
    );
  }

}
