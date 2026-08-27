import usuario from "./usuario.js"

class Publicacion {
    constructor(titulo, descripcion, usuario) {
       this.titulo= titulo 
       this.descripcion= descripcion
       this.usuario= usuario //objeto usuario
       this.fechaPublicacion= new Date()
       this.activa= true
    }

    mostrarResumen(titulo = this.titulo, usuario = this.usuario) {
        return `El título es ${titulo} y el autor es ${usuario.nombre}`;
    }
    estaActiva = (activa) => (activa);
}
export default Publicacion