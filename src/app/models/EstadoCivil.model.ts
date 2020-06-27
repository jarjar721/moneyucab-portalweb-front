export class EstadoCivil {

    EstadoCivilID: Number;
    Descripcion: String;
    Codigo: String;
    Estatus: Number;

    constructor(idEstadoCivil, descripcion, codigo, estatus){
        this.EstadoCivilID = idEstadoCivil;
        this.Descripcion = descripcion;
        this.Codigo = codigo;
        this.Estatus = estatus;
    }
}