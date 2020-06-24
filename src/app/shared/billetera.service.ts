import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {

  constructor(private http: HttpClient) { }

  //Si corres el servidor en Visual Studio
  //readonly BaseURI = 'http://localhost:49683/api/';
  //Si corres el servidor en consola usando "dotnet run"
  readonly BaseURI = 'http://localhost:5000/api/';

  addTarjeta(body){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'Billetera/tarjeta', body, {headers: tokenHeader});
  }

}
