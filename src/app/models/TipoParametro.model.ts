export class TipoParametro {

    TipoParametroID: Number;
    Descripcion: String;
    Estatus: Number;

    constructor(idTipoParametro, descripcion, estatus){
        this.TipoParametroID = idTipoParametro;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
    
}