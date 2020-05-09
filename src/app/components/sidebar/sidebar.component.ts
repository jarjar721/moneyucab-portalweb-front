import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UsuarioService } from 'src/app/shared/usuario.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // MoneyUCAB Routes
    { path: '/user-profile', title: 'Mi perfil',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/dashboard', title: 'Tablero de control',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/operaciones', title: 'Operaciones',  icon:'ni-planet text-blue', class: '' },
    { path: '/billeteras', title: 'Billeteras',  icon:'ni-pin-3 text-blue', class: '' },
    { path: '/recargas', title: 'Recargas',  icon:'ni-pin-3 text-orange', class: '' },
    // Argon Template Routes
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public userDetails;

  constructor(private router: Router, private service: UsuarioService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

   this.service.getUserDetails().subscribe(
      res => {
        this.userDetails = res;
        console.log(res); //Checking
      },
      err => {
        console.log(err);
      }
    );
  }


  /*
  * FUNCION: onLogout()
  * DESCRIPCIÓN:
  * Al cerrar sesión, se elimina el token del Local Storage y se redirige
  * al usuario al login page.
  */
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
