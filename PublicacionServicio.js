import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
	constructor(titulo, descripcion, usuario, precio, modalidad = "presencial") {
		super(titulo, descripcion, usuario);
		this.precio = precio;
		this.modalidad = modalidad;
	}
}

export default PublicacionServicio;
   