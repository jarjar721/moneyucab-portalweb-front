import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly BaseURI = GlobalConstants.apiURL;
  tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});

  constructor(private http: HttpClient) { }




  /* CONSULTAS BÁSICAS */
  /* GET BASIC BILLETERA INFO*/
  loadBancos() {
    return this.http.get(this.BaseURI+'Dashboard/Bancos', {headers: this.tokenHeader});
  }
  
  loadTipoTarjetas() {
    return this.http.get(this.BaseURI+'Dashboard/TiposTarjetas', {headers: this.tokenHeader});
  }

  loadTipoCuentas() {
    return this.http.get(this.BaseURI+'Dashboard/TiposCuentas', {headers: this.tokenHeader});
  }

  loadEstadosCiviles() {
    return this.http.get(this.BaseURI+'Dashboard/EstadosCiviles', {headers: this.tokenHeader});
  }

  loadTiposIdentificacion() {
    return this.http.get(this.BaseURI+'Dashboard/TiposIdentificaciones', {headers: this.tokenHeader});
  }

  loadTiposOperaciones() {
    return this.http.get(this.BaseURI+'Dashboard/TiposOperaciones', {headers: this.tokenHeader});
  }

  loadParametros() {
    return this.http.get(this.BaseURI+'Dashboard/Parametros', {headers: this.tokenHeader});
  }

  loadTiposParametros() {
    return this.http.get(this.BaseURI+'Dashboard/TiposParametros', {headers: this.tokenHeader});
  }

  loadFrecuencias() {
    return this.http.get(this.BaseURI+'Dashboard/Frecuencias', {headers: this.tokenHeader});
  }















  /* USER PROFILE */
  //GETs
  getUserInfo(username){
    return this.http.get(this.BaseURI+'Dashboard/InformacionPersona?Usuario='+username, {headers: this.tokenHeader});
  }

  getUserParameters(userIntID){
    return this.http.get(this.BaseURI+'Dashboard/ParametrosUsuario?idUsuario='+userIntID, {headers: this.tokenHeader});
  }

  //UPDATESs
  updateUserInfo(body) {
    return this.http.put(this.BaseURI+'EntityUsuario/Editar', body, {headers: this.tokenHeader});
  }

  updatePersonaComercioInfo(body) {
    return this.http.post(this.BaseURI+'Authentication/Modification', body, {headers: this.tokenHeader});
  }










  /* BILLETERAS */
  /* GET USER BILLETERA INFO */
  loadUserTarjetas(userIntID) {
    return this.http.get(this.BaseURI+'Dashboard/Tarjetas?IdUsuario='+userIntID, {headers: this.tokenHeader});
  }

  loadUserCuentas(userIntID) {
    return this.http.get(this.BaseURI+'Dashboard/Cuentas?IdUsuario='+userIntID, {headers: this.tokenHeader});
  }

  /* CREATES */
  createTarjeta(body) {
    return this.http.post(this.BaseURI+'Billetera/tarjeta', body, {headers: this.tokenHeader});
  }

  createCuenta(body) {
    return this.http.post(this.BaseURI+'Billetera/cuenta', body, {headers: this.tokenHeader});
  }

  /* DELETES */
  deleteTarjeta(TarjetaId) {
    return this.http.delete(this.BaseURI+'Billetera/EliminarTarjeta?TarjetaId='+TarjetaId, {headers: this.tokenHeader});
  }

  deleteCuenta(CuentaId) {
    return this.http.delete(this.BaseURI+'Billetera/EliminarCuenta?CuentaId='+CuentaId, {headers: this.tokenHeader});
  }









  /* OPERACIONES */
  getSaldoMonedero(userIntID) {
    return this.http.get(this.BaseURI+'Monedero/Consultar?idUsuario='+userIntID, {headers: this.tokenHeader});
  }

}
