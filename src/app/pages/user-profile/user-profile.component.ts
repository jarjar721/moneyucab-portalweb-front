import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  _username: string = localStorage.getItem('username');

  _user: any;

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.service.getUserInfo(this._username).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this._user = res;
      },
      err => {
        console.log(err); // error JSON
      }
    );

  }

}
