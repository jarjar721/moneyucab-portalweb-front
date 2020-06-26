import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = GlobalConstants.apiURL;

  addTarjeta(body){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'Billetera/tarjeta', body, {headers: tokenHeader});
  }

}
