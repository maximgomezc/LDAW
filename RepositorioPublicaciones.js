class RepositorioPublicaciones {
    constructor(publicaciones = []) {
    this.publicaciones = publicaciones
    }
    agregar = (publicacion) => (this.publicaciones.push(publicacion))
    agregarPublicacion = (publicacion) => (this.agregar(publicacion))
    buscarPorUsuario = (nombreUsuario) => (this.publicaciones.filter(p => p.usuario.nombre === nombreUsuario))
    cantidadTotal = () => (this.publicaciones.length)
    listarResumenes = () => (this.publicaciones.map(p => p.mostrarResumen()))
    filtrarPorTipo = (claseConstructor) => (this.publicaciones.filter(p => p instanceof claseConstructor))

}

export default RepositorioPublicaciones;