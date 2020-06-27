export class Banco {

    BancoID: Number;
    Nombre: String;
    Estatus: Number;

    constructor(bancoID, nombre, estatus){
        this.BancoID = bancoID;
        this.Nombre = nombre;
        this.Estatus = estatus;
    }
}