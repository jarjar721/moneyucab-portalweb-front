export class OperacionTarjeta {

    OperacionID: Number;
    TarjetaDescription: String;
    Monto: Number;
    Fecha: String;
    Referencia: String;

    constructor(idOperacion, tarjetaDescription, monto, fecha, referencia){
        this.OperacionID = idOperacion;
        this.TarjetaDescription = tarjetaDescription;
        this.Monto = monto;
        this.Fecha = fecha;
        this.Referencia = referencia;
    }
    
}