import Publicacion from './Publicacion.js';

class PublicacionVenta extends Publicacion {
    constructor(titulo, descripcion, usuario, precio) {
        super(titulo, descripcion, usuario);
        this.precio = precio;
        this.stock = 1;
    }

    mostrarResumen() {
        return `${super.mostrarResumen()} y el precio es ${this.precio}`;
    }
}

export default PublicacionVenta;