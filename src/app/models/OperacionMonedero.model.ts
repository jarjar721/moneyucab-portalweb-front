export class OperacionMonedero {

    OperacionID: Number;
    Monto: Number;
    Fecha: String;
    Referencia: String;

    constructor(idOperacion, monto, fecha, referencia){
        this.OperacionID = idOperacion;
        this.Monto = monto;
        this.Fecha = fecha;
        this.Referencia = referencia;
    }
    
}