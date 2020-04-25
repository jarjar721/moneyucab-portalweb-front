import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }


  /*
  * FUNCION: canActivate()
  * DESCRIPCIÓN:
  * Se encarga de verificar que el usuario haya iniciado sesión para 
  * poder acceder al portal. Revisa que haya un token en el Local Storage
  * del browser.
  * -- Si encuentra el token, devuelve TRUE y permite el acceso.
  * -- Si no encuentra el token, redirige al usuario al login page.
  */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      const helper = new JwtHelperService();
      var token = localStorage.getItem('token');

      if(token != null && !helper.isTokenExpired(token)){
        return true;
      } else {
        if(helper.isTokenExpired(token)) // Prueba para verificar que el token expira
          console.log('Token expired!'); // Prueba para verificar que el token expira
        this.router.navigate(['/login']);
        return false;
      }

  }
  
}
