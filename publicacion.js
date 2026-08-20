class publicacion {
    constructor(titulo, descripcion, autor) {
       this.titulo= titulo 
       this.descripcion= descripcion
       this.autor= autor
       this.fechaPublicacion= new Date()
       this.activa= true
    }

    mostrarResumen = (titulo, autor) => (`El título es ${titulo} y el autor es ${autor}`);
    estaActiva = (activa) => (activa);
}
export default publicacion