import publicacion from "./publicacion.js";
import usuario from "./usuario.js";

const arregloUsuarios= [
    new usuario("luca","lucakisner@gmail.com"),
    new usuario("max", "maximogomezcampello@gmail.com"), 
    new usuario ("seba", "sebapulles@gmail.com")
]

const arregloPublicaciones = [
    new publicacion("porotos", "frijoles", arregloUsuarios[0]),
    new publicacion("manzanas", "naranjas", arregloUsuarios[2]),
    new publicacion("berenjena", "violeta", arregloUsuarios[1]),
    new publicacion("kiwi", "peludo", arregloUsuarios[1]),
    new publicacion("banana", "amarilla", arregloUsuarios[0])
];

const publicacionKiwi = arregloPublicaciones.find(p => p.titulo === "kiwi");
if (publicacionKiwi) {
    publicacionKiwi.activa = false;
}

arregloPublicaciones.forEach(p => {
    console.log(p.mostrarResumen(p.titulo, p.usuario), p.estaActiva(p.activa));
});

