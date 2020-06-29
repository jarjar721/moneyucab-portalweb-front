import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly BaseURI = GlobalConstants.apiURL;
  tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});

  constructor(private http: HttpClient) { }

  /*
  * FUNCION: comparePasswords(fb:FormGroup)
  * DESCRIPCIÓN:
  * Compara los valores introducidos en los campos de contraseñas cuando
  * un usuario se registra. 
  * -- Si los valores de las contraseñas NO coinciden, se crea un error
  *    para ser mostrado en la vista.
  * -- Si las constraseñas SÍ coinciden, no se crea el error.
  */
  comparePasswords(formGroup: FormGroup) {
    let confirmPasswordControl = formGroup.get('ConfirmPassword');
    //passwordMismatch
    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if(formGroup.get('Password').value != formGroup.get('ConfirmPassword').value)
        confirmPasswordControl.setErrors({ passwordMismatch : true });
      else
        confirmPasswordControl.setErrors(null);
    }
  }











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

  /* CREATES */
  createParametro(body) {
    return this.http.post(this.BaseURI+'Transfer/EstablecerParametro', body, {headers: this.tokenHeader});
  }

  changePassword(body) {
    return this.http.post(this.BaseURI+'Authentication/ChangePassword', body, {headers: this.tokenHeader});
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

  getOperacionesMonedero(userIntID) {
    return this.http.get(this.BaseURI+'HistorialOperaciones/HistorialOperacionesMonedero?idUsuario='+userIntID, {headers: this.tokenHeader});
  }

  getOperacionesTarjeta(idTarjeta) {
    return this.http.get(this.BaseURI+'HistorialOperaciones/HistorialOperacionesTarjeta?idTarjeta='+idTarjeta, {headers: this.tokenHeader});
  }

  getOperacionesCuenta(idCuenta) {
    return this.http.get(this.BaseURI+'HistorialOperaciones/HistorialOperacionesCuenta?idCuenta='+idCuenta, {headers: this.tokenHeader});
  }

  recargarConTarjeta(body) {
    return this.http.post(this.BaseURI+'Monedero/RecargaMonederoTarjeta', body, {headers: this.tokenHeader});
  }

  recargarConCuenta(body) {
    return this.http.post(this.BaseURI+'Monedero/RecargaMonederoCuenta', body, {headers: this.tokenHeader});
  }

}
