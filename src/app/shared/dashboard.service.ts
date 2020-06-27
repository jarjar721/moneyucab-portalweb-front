import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly BaseURI = GlobalConstants.apiURL;

  constructor(private http: HttpClient) { }

  /* CONSULTAS BÁSICAS */
  /* GET BASIC BILLETERA INFO*/
  loadBancos() {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/Bancos', {headers: tokenHeader});
  }
  
  loadTipoTarjetas() {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/TiposTarjetas', {headers: tokenHeader});
  }

  loadTipoCuentas() {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/TiposCuentas', {headers: tokenHeader});
  }

  loadEstadosCiviles() {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/EstadosCiviles', {headers: tokenHeader});
  }










  /* USER PROFILE */
  //GETs
  getUserInfo(username){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/InformacionPersona?Usuario='+username, {headers: tokenHeader});
  }

  getUserParameters(userIntID){
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/ParametrosUsuario?idUsuario='+userIntID, {headers: tokenHeader});
  }

  //UPDATESs
  updateUserInfo(body) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.BaseURI+'EntityUsuario/Editar', body, {headers: tokenHeader});
  }

  updatePersonaComercioInfo(body) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'Authentication/Modification', body, {headers: tokenHeader});
  }










  /* BILLETERAS */
  /* GET USER BILLETERA INFO */
  loadUserTarjetas(userIntID) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/Tarjetas?IdUsuario='+userIntID, {headers: tokenHeader});
  }

  loadUserCuentas(userIntID) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'Dashboard/Cuentas?IdUsuario='+userIntID, {headers: tokenHeader});
  }

  /* CREATES */
  createTarjeta(body) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'Billetera/tarjeta', body, {headers: tokenHeader});
  }

  createCuenta(body) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'Billetera/cuenta', body, {headers: tokenHeader});
  }

  /* DELETES */
  deleteTarjeta(TarjetaId) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.BaseURI+'Billetera/EliminarTarjeta?TarjetaId='+TarjetaId, {headers: tokenHeader});
  }

  deleteCuenta(CuentaId) {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.BaseURI+'Billetera/EliminarCuenta?CuentaId='+CuentaId, {headers: tokenHeader});
  }


}
