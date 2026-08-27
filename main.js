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
    new PublicacionServicio("Clases de matemática", "Apoyo para nivel secundario", arregloUsuarios[0], 2500, "virtual", 2),
    new PublicacionVenta("manzanas", "Naranjas frescas", arregloUsuarios[2], 1800),
    new PublicacionServicio("Tutoría de programación", "Introducción a JavaScript", arregloUsuarios[1], 3000, "presencial", 1),
    new PublicacionVenta("kiwi", "Kiwi fresco", arregloUsuarios[1], 1200),
    new PublicacionServicio("Clases de inglés", "Conversación y gramática", arregloUsuarios[0], 2800, "presencial", 1.5),
    new PublicacionServicio("Apoyo de física", "Preparación para exámenes", arregloUsuarios[2], 3200, "virtual", 2),
    new PublicacionVenta("bananas", "Bananas frescas", arregloUsuarios[0], 1500)
];

arregloUsuarios[0].email = "porotos@gmail.com"

const publicacionKiwi = arregloPublicaciones.find(p => p.titulo === "kiwi");
publicacionKiwi.activa = false;

const repositorio = new RepositorioPublicaciones();

arregloPublicaciones.forEach(p => {
    repositorio.agregar(p);
    console.log(p.mostrarResumen(), p.estaActiva(p.activa));
});

console.log("Cantidad total de publicaciones:");
console.log(repositorio.cantidadTotal());

console.log("Publicaciones de luca:");
console.log(repositorio.buscarPorUsuario("luca"));

console.log("Publicaciones de max:");
console.log(repositorio.buscarPorUsuario("max"));


console.log("Publicaciones de seba:");
console.log(repositorio.buscarPorUsuario("seba"));

const publicacionesActivas = arregloPublicaciones.filter(p => p.activa)
console.log(publicacionesActivas)

const primeraPublicacion = arregloPublicaciones.find(p => p.usuario.nombre === "luca")
console.log(primeraPublicacion)

console.log("--- Resúmenes de todas las publicaciones ---");
console.log(repositorio.listarResumenes());

console.log("--- Filtrar por tipo: PublicacionVenta ---");
console.log(repositorio.filtrarPorTipo(PublicacionVenta));

console.log("--- Filtrar por tipo: PublicacionServicio ---");
console.log(repositorio.filtrarPorTipo(PublicacionServicio));