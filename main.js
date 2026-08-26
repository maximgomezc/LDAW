import Publicacion from "./Publicacion.js";
import usuario from "./usuario.js";
import RepositorioPublicaciones from "./RepositorioPublicaciones.js";

const arregloUsuarios = [
    new usuario("luca", "lucakisner@gmail.com"),
    new usuario("max", "maximogomezcampello@gmail.com"),
    new usuario("seba", "sebapulles@gmail.com")
]

const arregloPublicaciones = [
    new Publicacion("porotos", "frijoles", arregloUsuarios[0]),
    new Publicacion("manzanas", "naranjas", arregloUsuarios[2]),
    new Publicacion("berenjena", "violeta", arregloUsuarios[1]),
    new Publicacion("kiwi", "peludo", arregloUsuarios[1]),
    new Publicacion("banana", "amarilla", arregloUsuarios[0])
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
    repositorio.agregarPublicacion(p);
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