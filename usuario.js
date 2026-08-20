class usuario{
    constructor(nombre, email){
        this.nombre= nombre
        this.email= email
        this.fechaRegistro= new Date()
    }
    mostrarPerfil = (nombre, email) => (`El nombre es:${nombre} y el email es:${email}`)
}