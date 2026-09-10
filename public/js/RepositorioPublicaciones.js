export class RepositorioPublicaciones {
    constructor(publicaciones = []) {
        this.publicaciones = publicaciones
    }

    agregar(publicacion) {
        this.publicaciones.push(publicacion);
    }

    buscarPorEtiqueta(etiqueta) {
        return this.publicaciones.filter(publicacion =>
        publicacion.activa && publicacion.tieneEtiqueta(etiqueta)
        );
    }
}

export default RepositorioPublicaciones;