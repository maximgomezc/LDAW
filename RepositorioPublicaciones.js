import { EventEmitter } from "node:events";

class RepositorioPublicaciones extends EventEmitter {
    constructor(publicaciones = []) {
        super();
        this.publicaciones = publicaciones
    }
    agregar = (publicacion) => {
        this.publicaciones.push(publicacion);
        this.emit("publicacionAgregada", publicacion);
    }
    agregarPublicacion = (publicacion) => (this.agregar(publicacion))
    buscarPorUsuario = (nombreUsuario) => (this.publicaciones.filter(p => p.autor.nombre === nombreUsuario))
    cantidadTotal = () => (this.publicaciones.length)
    listarResumenes = () => (this.publicaciones.map(p => p.mostrarResumen()))
    filtrarPorTipo = (claseConstructor) => (this.publicaciones.filter(p => p instanceof claseConstructor))

}

export default RepositorioPublicaciones;