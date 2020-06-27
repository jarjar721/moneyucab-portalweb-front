export class TipoTarjeta {

    TipoTarjetaID: Number;
    Descripcion: String;
    Estatus: Number;

    constructor(tipoTarjetaID, descripcion, estatus){
        this.TipoTarjetaID = tipoTarjetaID;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
}