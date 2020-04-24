import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

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
  public userDetails;

  constructor(location: Location,  private element: ElementRef, private router: Router, private service: UsuarioService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.service.getUserDetails().subscribe(
      res => {
        this.userDetails = res;
        console.log(res); //Checking
      },
      err => {
        console.log(err);
      }
    )
  }

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

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
