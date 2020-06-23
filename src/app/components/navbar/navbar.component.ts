import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

// Services
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  public userName: String;

  constructor(location: Location, private element: ElementRef, private router: Router, private service: UsuarioService) {
    this.location = location;
  }

  /*
  * FUNCION: ngOnInit()
  * DESCRIPCIÓN:
  * Al inicializar el navbar, se llena el array "listTitles" y se buscan
  * los detalles del usuario.
  * -- Si hay un resultado en la busqueda, los guarda en "userDetails".
  * -- Si hay un error en la busqueda, muestrar el error por consola.
  */
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.userName = localStorage.getItem('username');
    /*
    this.service.getUserDetails().subscribe(
      res => {
        this.userDetails = res;
        console.log(res); //Checking
      },
      err => {
        console.log(err);
      }
    );
    */
  }

  /*
  * FUNCION: getTitle()
  * DESCRIPCIÓN:
  * Se encarga de colocar en el navbar el título de la página a la que
  * accede el usuario.
  * ESTA FUNCIÓN ES PROPIA DE LA PLANTILLA
  */
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  /*
  * FUNCION: onLogout()
  * DESCRIPCIÓN:
  * Al cerrar sesión, se elimina el token del Local Storage y se redirige
  * al usuario al login page.
  */
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    
    this.router.navigate(['/login']);
  }

}
