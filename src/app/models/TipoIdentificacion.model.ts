export class TipoIdentificacion {

    TipoIdentificacionID: Number;
    Codigo: String;
    Descripcion: String;
    Estatus: Number;

    constructor(idTipoIdentificacion, codigo, descripcion, estatus){
        this.TipoIdentificacionID = idTipoIdentificacion;
        this.Codigo = codigo;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
    
}