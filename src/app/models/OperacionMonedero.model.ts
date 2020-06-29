export class OperacionMonedero {

    OperacionID: Number;
    Monto: Number;
    Fecha: String;
    Referencia: String;

    constructor(idOperacionMonedero, monto, fecha, referencia){
        this.OperacionID = idOperacionMonedero;
        this.Monto = monto;
        this.Fecha = fecha;
        this.Referencia = referencia;
    }
    
}