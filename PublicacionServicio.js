import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
	constructor(titulo, descripcion, autor, precio, modalidad = "presencial", duracion = 1, cliente = null) {
		super(titulo, descripcion, autor);
		this.precio = precio;
		this.modalidad = modalidad;
		this.duracion = duracion;
		this.cliente = cliente;
	}

	mostrarResumen() {
		return `${super.mostrarResumen()} y la modalidad es ${this.modalidad}, con una duración de ${this.duracion} horas`;
	}
}

export default PublicacionServicio;
   