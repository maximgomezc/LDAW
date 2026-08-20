import usuario from "./usuario.js"

class publicacion {
    constructor(titulo, descripcion, usuario) {
       this.titulo= titulo 
       this.descripcion= descripcion
       this.usuario= usuario //objeto usuario
       this.fechaPublicacion= new Date()
       this.activa= true
    }

    mostrarResumen = (titulo, usuario) => (`El título es ${titulo} y el autor es ${usuario.nombre}`);
    estaActiva = (activa) => (activa);
}
export default publicacion