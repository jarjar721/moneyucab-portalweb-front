export class OperacionCuenta {

    OperacionID: Number;
    CuentaDescription: String;
    Monto: Number;
    Fecha: String;
    Referencia: String;

    constructor(idOperacion, cuentaDescription, monto, fecha, referencia){
        this.OperacionID = idOperacion;
        this.CuentaDescription = cuentaDescription;
        this.Monto = monto;
        this.Fecha = fecha;
        this.Referencia = referencia;
    }
    
}