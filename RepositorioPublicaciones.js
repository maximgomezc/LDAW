class RepositorioPublicaciones {
    constructor(publicaciones) {
    this.publicaciones = []
    }
    agregarPublicacion = (publicacion) => (this.publicaciones.push(publicacion))
    buscarPorUsuario = (nombreUsuario) => (this.publicaciones.filter(p => p.usuario.nombre === nombreUsuario))
    cantidadTotal = () => (this.publicaciones.length)

}

export default RepositorioPublicaciones;