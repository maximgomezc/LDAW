import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
	constructor(titulo, descripcion, usuario, precio, modalidad = "presencial", duracion = 1) {
		super(titulo, descripcion, usuario);
		this.precio = precio;
		this.modalidad = modalidad;
		this.duracion = duracion;
	}

	mostrarResumen() {
		return `${super.mostrarResumen()} y la modalidad es ${this.modalidad}, con una duración de ${this.duracion} horas`;
	}
}

export default PublicacionServicio;
   