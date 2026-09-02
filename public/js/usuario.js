export class usuario{
    constructor(nombre, email){
        this.nombre= nombre
        this.email= email
        this.fechaRegistro= new Date()
        this.contactos = []
    }
    mostrarPerfil = (nombre, email) => (`El nombre es:${nombre} y el email es:${email}`)
    agregarContacto = (otroUsuario) => (this.contactos.push(otroUsuario))
}
export default usuario