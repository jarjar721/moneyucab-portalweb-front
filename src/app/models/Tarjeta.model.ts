export class Tarjeta {

    TarjetaID: Number;
    CardNumber: String;
    MesExpiracion: String;
    YearExpiracion: String;
    CCV: Number;
    Estatus: Number;

    constructor(
        idTarjeta,
        cardNumber,
        CCV, 
        mesExpiracion, 
        yearExpiracion, 
        estatus
    ) {
        this.TarjetaID = idTarjeta;
        this.CardNumber = cardNumber;
        this.CCV = CCV;
        this.MesExpiracion = mesExpiracion;
        this.YearExpiracion = yearExpiracion;
        this.Estatus = estatus;
    }
}