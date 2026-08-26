import Publicacion from './Publicacion.js';

class PublicacionVenta extends Publicacion {
    constructor(titulo, descripcion, usuario, precio) {
        super(titulo, descripcion, usuario);
        this.precio = precio;
        this.stock = 1;
    }
}

export default PublicacionVenta;