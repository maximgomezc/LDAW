export class RepositorioPublicaciones {
    constructor() {
        this.publicaciones = []
    }

    agregar(publicacion) {
        this.publicaciones.push(publicacion);
    }

    buscarPorEtiqueta(etiqueta) {
        return this.publicaciones.filter(publicacion =>
        publicacion.activa && publicacion.tieneEtiqueta(etiqueta)
        );
    }
    pendientesDeRevision() {
        return this.publicaciones.filter(p => p.activa && p.requiereRevision());
    }
}

export default RepositorioPublicaciones;