import publicacion from "./publicacion.js";

const arregloPublicaciones= [
    new publicacion("porotos", "frijoles", "tortuga"),
    new publicacion("manzanas", "naranjas", "sapo"),
    new publicacion("berenjena", "violeta", "suricata"),
    new publicacion("kiwi", "peludo", "mono")
]

arregloPublicaciones.find(publicacion.titulo==="kiwi") => publicacion.activa=false

arregloPublicaciones.forEach(p => {
    console.log(mostrarResumen(this.titulo, this.autor), estaActiva(this.activa))
});