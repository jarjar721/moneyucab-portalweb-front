export class Tarjeta {

    CardNumber: String;
    Titular: String;
    MesExpiracion: String;
    YearExpiracion: String;
    BancoEmisor: Number;
    CCV: Number;
    TipoTarjeta: Number;

    constructor(
        cardNumber,
        titular, 
        tipoTarjeta,
        CCV, 
        mesExpiracion, 
        yearExpiracion, 
        bancoEmisor
    ) {
        this.CardNumber = cardNumber;
        this.Titular = titular;
        this.TipoTarjeta = tipoTarjeta;
        this.CCV = CCV;
        this.MesExpiracion = mesExpiracion;
        this.YearExpiracion = yearExpiracion;
        this.BancoEmisor = bancoEmisor;
    }
}