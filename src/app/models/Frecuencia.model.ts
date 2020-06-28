export class Frecuencia {

    FrecuenciaID: Number;
    Codigo: String;
    Descripcion: String;
    Estatus: Number;

    constructor(idFrecuencia, codigo, descripcion, estatus){
        this.FrecuenciaID = idFrecuencia;
        this.Codigo = codigo;
        this.Descripcion = descripcion;
        this.Estatus = estatus;
    }
    
}