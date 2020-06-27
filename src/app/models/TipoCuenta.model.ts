export class TipoCuenta {

    TipoCuentaID: Number;
    Descripcion: String;
    Estatus: Number;

    constructor(tipoCuentaID, descripcion, estatus){
        this.TipoCuentaID = tipoCuentaID;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
}