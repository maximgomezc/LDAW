class RepositorioPublicaciones {
    constructor(publicaciones) {
    this.publicaciones = []
    }
    agregarPublicacion = (publicacion) => (this.publicaciones.push(publicacion))
    buscarPorUsuario = (nombreUsuario) => (this.publicaciones.filter(p => p.usuario.nombre === nombreUsuario))

}

export default RepositorioPublicaciones;