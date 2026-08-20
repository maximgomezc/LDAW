import publicacion from "./publicacion.js";
import usuario from "./usuario.js";

const arregloPublicaciones = [
    new publicacion("porotos", "frijoles", "tortuga"),
    new publicacion("manzanas", "naranjas", "sapo"),
    new publicacion("berenjena", "violeta", "suricata"),
    new publicacion("kiwi", "peludo", "mono"),
    new publicacion("banana", "amarilla", "mosca")
];

const arregloUsuarios= [
    new usuario("luca","lucakisner@gmail.com"),
    new usuario("max", "maximogomezcampello@gmail.com"), 
    new usuario ("seba", "sebapulles@gmail.com")
]

const publicacionKiwi = arregloPublicaciones.find(p => p.titulo === "kiwi");
if (publicacionKiwi) {
    publicacionKiwi.activa = false;
}

arregloPublicaciones.forEach(p => {
    console.log(p.mostrarResumen(p.titulo, p.autor), p.estaActiva(p.activa));
});