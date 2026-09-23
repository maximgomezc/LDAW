import {Reporte} from "./Reporte.js";

export const CATEGORIAS_PERMITIDAS = ["general", "aviso", "evento", "compraventa"];

export class Publicacion {
    constructor(autor, titulo, descripcion, categoria = "general") {
        if (!autor?.trim()) {
            throw new Error("El autor es obligatorio");
        }

        const tituloNormalizado = titulo?.trim() ?? "";
        if (tituloNormalizado.length < 5 || tituloNormalizado.length > 80) {
            throw new Error("El título debe tener entre 5 y 80 caracteres");
        }

        const descripcionNormalizada = descripcion?.trim() ?? "";
        if (descripcionNormalizada.length < 20 || descripcionNormalizada.length > 500) {
            throw new Error("La descripcion debe tener entre 20 y 500 caracteres");
        }

        if (!CATEGORIAS_PERMITIDAS.includes(categoria)) {
            throw new Error(`La categoría debe ser una de: ${CATEGORIAS_PERMITIDAS.join(", ")}`);
        }

        this.autor = autor.trim();
        this.titulo = tituloNormalizado;
        this.descripcion = descripcionNormalizada;
        this.categoria = categoria;
        this.fechaPublicacion = new Date();
        this.activa = true;
        this.destacado = false;
        this.etiquetas = [];
        this.reportes = [];
        this.estado = "pendiente";
    }

    mostrarResumen(titulo = this.titulo, autor = this.autor) {
        const nombreAutor = typeof autor === "string" ? autor : autor?.nombre ?? "desconocido";
        return `El título es ${titulo} y el autor es ${nombreAutor}`;
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
        const nombreAutor = typeof this.autor === "string" ? this.autor : this.autor?.nombre ?? "desconocido";
        const estado = this.activa ? "Activa" : "Inactiva";
        return `${this.titulo} — ${nombreAutor} (${estado})`;
    }

    estaActiva = (activa) => (activa);

    diasPublicada() {
        const ms = new Date() - this.fechaPublicacion;
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }

    darDeBaja() { this.activa = false; }
    destacar() { this.destacado = true; }
    opacar() { this.destacado = false; }

    reportar(usuario, motivo) {
        const yaReporto = this.reportes.some(r => r.usuario === usuario);
        if (yaReporto) {
            throw new Error("El usuario ya reportó esta publicación");
        }
        this.reportes.push(new Reporte(usuario, motivo));
    }

    requiereRevision() {
        return this.reportes.length >= 3;
    }

    async revisar(servicioModeracion) {
        const decision = await servicioModeracion.evaluar(this);

        if (decision === "aprobado") {
            this.estado = "aprobada";
        } else if (decision === "rechazado") {
            this.estado = "rechazada";
        } else {
            throw new Error("Decisión de moderación inválida");
        }

        return this.estado;
    }
}

export default Publicacion;