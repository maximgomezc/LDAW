import usuario from "./usuario.js"

export class Publicacion {
    constructor(titulo, descripcion, autor) {
       this.titulo= titulo 
       this.descripcion= descripcion
       this.autor= autor //objeto usuario
       this.fechaPublicacion= new Date()
       this.activa= true
       this.destacado= false
       this.etiquetas= []
    }

    mostrarResumen(titulo = this.titulo, autor = this.autor) {
        return `El título es ${titulo} y el autor es ${autor.nombre}`;
    }

    agregarEtiqueta(etiqueta) {
        const normalizada = etiqueta.trim();
        if (!normalizada) {
        throw new Error("Etiqueta inválida");
        }
        const yaExiste = this.tieneEtiqueta(normalizada);
        if (!yaExiste) {
        this.etiquetas.push(normalizada);
        }
    }

    tieneEtiqueta(etiqueta) {
        const buscada = etiqueta.trim().toLowerCase();
        return this.etiquetas.some(e => e.toLowerCase() === buscada);
    }


    get resumen() {
        const estado = this.activa ? "Activa" : "Inactiva";
        return `${this.titulo} — ${this.autor.nombre} (${estado})`;
    }

    estaActiva = (activa) => (activa);

    diasPublicada() {
        const ms = new Date() - this.fechaPublicacion;
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }
    darDeBaja() { this.activa = false; }
    destacar() { this.destacado = true; }
    opacar() { this.destacado = false; }
}
export default Publicacion