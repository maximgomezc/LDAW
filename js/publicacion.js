import usuario from "./usuario.js"

class Publicacion {
    constructor(titulo, descripcion, autor) {
       this.titulo= titulo 
       this.descripcion= descripcion
       this.autor= autor //objeto usuario
       this.fechaPublicacion= new Date()
       this.activa= true
    }

    mostrarResumen(titulo = this.titulo, autor = this.autor) {
        return `El título es ${titulo} y el autor es ${autor.nombre}`;
    }
    estaActiva = (activa) => (activa);

    diasPublicada() {
        const ms = new Date() - this.fechaPublicacion;
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }
}
export default Publicacion