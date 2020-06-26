import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly BaseURI = GlobalConstants.apiURL;

  constructor(private http: HttpClient) { }

  //GETs
  getUserInfo(username){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/InformacionPersona?Usuario='+username, {headers: tokenHeader});
  }

  getUserParameters(userIntID){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/ParametrosUsuario?idUsuario='+userIntID, {headers: tokenHeader});
  }

  //PUTs
  updateUserInfo(body){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/InformacionPersona?Usuario='+body, {headers: tokenHeader});
  }

}
