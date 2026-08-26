import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import usuario from "./usuario.js";
import RepositorioPublicaciones from "./RepositorioPublicaciones.js";

const arregloUsuarios = [
    new usuario("luca", "lucakisner@gmail.com"),
    new usuario("max", "maximogomezcampello@gmail.com"),
    new usuario("seba", "sebapulles@gmail.com")
]

const arregloPublicaciones = [
    new PublicacionServicio("Clases de matemática", "Apoyo para nivel secundario", arregloUsuarios[0], 2500, "virtual"),
    new PublicacionVenta("manzanas", "Naranjas frescas", arregloUsuarios[2], 1800),
    new PublicacionServicio("Tutoría de programación", "Introducción a JavaScript", arregloUsuarios[1], 3000),
    new PublicacionVenta("kiwi", "Kiwi fresco", arregloUsuarios[1], 1200),
    new PublicacionServicio("Clases de inglés", "Conversación y gramática", arregloUsuarios[0], 2800, "presencial")
];

arregloUsuarios[0].email = "porotos@gmail.com"

const publicacionKiwi = arregloPublicaciones.find(p => p.titulo === "kiwi");
if (publicacionKiwi) {
    publicacionKiwi.activa = false;
}

arregloPublicaciones.forEach(p => {
    console.log(p.mostrarResumen(p.titulo, p.usuario), p.estaActiva(p.activa));
});

const repositorio = new RepositorioPublicaciones();

arregloPublicaciones.forEach(p => {
    repositorio.agregar(p);
});

console.log("Cantidad total de publicaciones:");
console.log(repositorio.cantidadTotal());

console.log("Publicaciones de luca:");
console.log(repositorio.buscarPorUsuario("luca"));

console.log("Publicaciones de max:");
const publicacionesDeMax = repositorio.buscarPorUsuario("max");
console.log(publicacionesDeMax);
console.log("Max tiene una PublicacionServicio:", publicacionesDeMax.some(p => p instanceof PublicacionServicio));
console.log("Max tiene una PublicacionVenta:", publicacionesDeMax.some(p => p instanceof PublicacionVenta));


console.log("Publicaciones de seba:");
console.log(repositorio.buscarPorUsuario("seba"));

const publicacionesActivas = arregloPublicaciones.filter(p => p.activa)
console.log(publicacionesActivas)

const primeraPublicacion = arregloPublicaciones.find(p => p.usuario.nombre === "luca")
console.log(primeraPublicacion)