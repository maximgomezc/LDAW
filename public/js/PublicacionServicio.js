import Publicacion from "./publicacion.js";

export class PublicacionServicio extends Publicacion {
	constructor(titulo, descripcion, autor, precio, modalidad, duracion, cliente) {
		super(titulo, descripcion, autor);
		this.precio = precio;
		this.modalidad = modalidad;
		this.duracion = duracion;
		this.cliente = cliente;
	}

	mostrarResumen() {
		return `${super.mostrarResumen()} y la modalidad es ${this.modalidad}, con una duración de ${this.duracion} minutos`;
	}
}

export default PublicacionServicio;
   