class RepositorioPublicaciones {
    constructor(publicaciones = []) {
    this.publicaciones = publicaciones
    }
    agregar = (publicacion) => (this.publicaciones.push(publicacion))
    agregarPublicacion = (publicacion) => (this.agregar(publicacion))
    buscarPorUsuario = (nombreUsuario) => (this.publicaciones.filter(p => p.usuario.nombre === nombreUsuario))
    cantidadTotal = () => (this.publicaciones.length)

}

export default RepositorioPublicaciones;