export class Cuenta {

    CuentaID: Number;
    NumeroCuenta: String;
    TipoCuenta: String;
    Banco: String;

    constructor(idCuenta, numeroCuenta, tipoCuenta, banco){
        this.CuentaID = idCuenta;
        this.NumeroCuenta = numeroCuenta;
        this.TipoCuenta = tipoCuenta;
        this.Banco = banco;
    }
}