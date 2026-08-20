import publicacion from "./publicacion.js";

const arregloPublicaciones = [
    new publicacion("porotos", "frijoles", "tortuga"),
    new publicacion("manzanas", "naranjas", "sapo"),
    new publicacion("berenjena", "violeta", "suricata"),
    new publicacion("kiwi", "peludo", "mono")
];

const publicacionKiwi = arregloPublicaciones.find(p => p.titulo === "kiwi");
if (publicacionKiwi) {
    publicacionKiwi.activa = false;
}

arregloPublicaciones.forEach(p => {
    console.log(p.mostrarResumen(p.titulo, p.autor), p.estaActiva(p.activa));
});