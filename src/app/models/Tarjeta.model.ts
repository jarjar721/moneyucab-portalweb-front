export class Tarjeta {

    TarjetaID: Number;
    CardNumber: String;
    MesExpiracion: String;
    YearExpiracion: String;
    CCV: Number;
    Estatus: Number;
    TipoTarjeta: String;
    Banco: String;

    constructor(
        idTarjeta,
        cardNumber,
        CCV, 
        mesExpiracion, 
        yearExpiracion, 
        estatus,
        tipoTarjeta,
        banco
    ) {
        this.TarjetaID = idTarjeta;
        this.CardNumber = cardNumber;
        this.CCV = CCV;
        this.MesExpiracion = mesExpiracion;
        this.YearExpiracion = yearExpiracion;
        this.Estatus = estatus;
        this.TipoTarjeta = tipoTarjeta;
        this.Banco = banco;
    }
}