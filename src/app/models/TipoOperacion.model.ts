export class TipoOperacion {

    TipoOperacionID: Number;
    Descripcion: String;
    Estatus: Number;

    constructor(idTipoOperacion, descripcion, estatus){
        this.TipoOperacionID = idTipoOperacion;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
    
}