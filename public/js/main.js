import {PublicacionVenta} from "../../src/PublicacionVenta.js";
import {PublicacionServicio} from "../../src/PublicacionServicio.js";
import {usuario} from "../../src/usuario.js";
import {RepositorioPublicaciones} from "../../src/RepositorioPublicaciones.js";

const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const autor = document.getElementById("autor");
const email = document.getElementById("email");
const tipo = document.getElementById("tipo");
const vistaPrevia = document.getElementById("vista-previa");
const camposEspecificos = document.getElementById("campos-especificos");
const ayudaEmail = document.getElementById("ayuda-email");
const formulario = document.getElementById("form-publicacion");
const listaPublicaciones = document.getElementById("lista-publicaciones");
const estado = document.getElementById("estado");
const botonActualizar = document.getElementById("botonActualizar");
const botonForzarError = document.getElementById("botonForzarError");
const errorTitulo = document.getElementById("errorTitulo");
const errorAutor = document.getElementById("errorAutor");

function observarEvento(evento) {
 console.table({
 type: evento.type,
 target: evento.target.id,
 currentTarget: evento.currentTarget.id,
 timeStamp: Math.round(evento.timeStamp)
 });
}
titulo.addEventListener("input", observarEvento);
tipo.addEventListener("change", observarEvento);

function validarTitulo(mostrarError = true) {
 const valido = titulo.value.trim().length >= 5;
 titulo.classList.toggle("valido", valido);
 titulo.classList.toggle("invalido", !valido && mostrarError);
 errorTitulo.textContent = !valido && mostrarError ? "Ingrese al menos 5 caracteres" : "";
 return valido;
}
titulo.addEventListener("input", () => validarTitulo(false));
titulo.addEventListener("blur", () => validarTitulo(true));

function validarAutor(mostrarError = true) {
 const valido = autor.value.trim().length >= 3;
 autor.classList.toggle("valido", valido);
 autor.classList.toggle("invalido", !valido && mostrarError);
 errorAutor.textContent = !valido && mostrarError ? "Ingrese al menos 3 caracteres" : "";
 return valido;
}
autor.addEventListener("input", () => validarAutor(false));
autor.addEventListener("blur", () => validarAutor(true));

function validarPrecio(mostrarError = true) {
 const precio = document.getElementById("precio");
 if (!precio) return true;
 const errorPrecio = document.getElementById("errorPrecio");
 const valido = Number(precio.value) > 0;
 precio.classList.toggle("valido", valido);
 precio.classList.toggle("invalido", !valido && mostrarError);
 errorPrecio.textContent = !valido && mostrarError ? "El precio debe ser mayor a 0" : "";
 return valido;
}

const contador = document.getElementById("contador");
function actualizarVistaPrevia() {
 contador.textContent = descripcion.value.length;
 vistaPrevia.textContent = `${titulo.value || "Sin título"} — ` +
 `${autor.value || "..."} (${tipo.value})`;
}
[titulo, autor, descripcion, tipo].forEach(control => control.addEventListener("input", actualizarVistaPrevia));

function actualizarCamposEspecificos() {
 if (tipo.value === "venta") {
 camposEspecificos.innerHTML = `
 <input id="precio" type="number" placeholder="Precio">
 <small id="errorPrecio"></small>
 <input id="stock" type="number" value="1">`;
 const precio = document.getElementById("precio");
 precio.addEventListener("input", () => validarPrecio(false));
 precio.addEventListener("blur", () => validarPrecio(true));
 } else {
 camposEspecificos.innerHTML = `
 <select id="modalidad">
 <option>presencial</option><option>virtual</option>
 </select>
 <input id="duracion" type="number" placeholder="Minutos">`;
 }
}
tipo.addEventListener("change", actualizarCamposEspecificos);
actualizarCamposEspecificos();

function mostrarAyudaEmail() {
 ayudaEmail.textContent = "Usá un email válido del autor";
}
function ocultarAyudaEmail() { ayudaEmail.textContent = ""; }
email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

const repositorio = new RepositorioPublicaciones();
window.repositorio = repositorio
function agregarTarjeta(publicacion) {
 const tarjeta = document.createElement("article");
 const tituloTarjeta = document.createElement("h2");
 const descripcionTarjeta = document.createElement("p");
 const estado = document.createElement("span");
 const boton = document.createElement("button");
 const botonDestacar = document.createElement("button");

 tituloTarjeta.textContent = publicacion.titulo;
 descripcionTarjeta.textContent = publicacion.mostrarResumen();
 estado.textContent = publicacion.activa ? "Activa" : "Inactiva";
 boton.textContent = "Dar de baja";
 if (!publicacion.activa) boton.disabled = true;
 botonDestacar.textContent = "Destacar";
 if (publicacion.destacado) tarjeta.style.border = "2px solid gold";
 
 tarjeta.dataset.id = repositorio.publicaciones.indexOf(publicacion);
 boton.dataset.accion = "baja";
 botonDestacar.dataset.accion = "destacar";

 tarjeta.append(tituloTarjeta, descripcionTarjeta, estado, boton, botonDestacar);
 listaPublicaciones.appendChild(tarjeta);
}

function renderizarPublicaciones() {
 listaPublicaciones.innerHTML = "";
 repositorio.publicaciones.forEach(p => agregarTarjeta(p));
}

function crearPublicacionDesdeFormulario() {
 const usuarioCreado = new usuario(autor.value, email.value);
 if (tipo.value === "venta") {
 return new PublicacionVenta(
 titulo.value, descripcion.value, usuarioCreado,
 Number(document.querySelector("#precio").value)
 );
 }
 return new PublicacionServicio(
 titulo.value, descripcion.value, usuarioCreado,
 null,
 document.querySelector("#modalidad").value,
 Number(document.querySelector("#duracion").value),
 null
 );
}
async function manejarEnvio(evento) {
 evento.preventDefault();
 if (!validarTitulo(true)) return;
 enviar.disabled = true;
 estado.textContent = "Publicando...";
 try {
 await esperar(800);
 const publicacion = crearPublicacionDesdeFormulario();
 repositorio.agregar(publicacion);
 window.publicacionActual = publicacion;
 renderizarPublicaciones();
 estado.textContent = "Publicación agregada";
 formulario.reset();
 actualizarVistaPrevia();
 } catch (error) {
 estado.textContent = `Error: ${error.message}`;
 } finally {
 actualizarEstadoFormulario();
 }
}
formulario.addEventListener("submit", manejarEnvio);

function manejarAccion(evento) {
 const boton = evento.target.closest("button[data-accion]");
 if (!boton || !listaPublicaciones.contains(boton)) return;
 const tarjeta = boton.closest("[data-id]");
 const id = Number(tarjeta.dataset.id);
 
 const publicacion = repositorio.publicaciones[id];
 const accion = boton.dataset.accion;
 
 if (accion === "baja") publicacion.darDeBaja();
 if (accion === "destacar") publicacion.destacar();
 
 renderizarPublicaciones();
}
listaPublicaciones.addEventListener("click", manejarAccion);

function esperar(ms) {
 return new Promise(resolve => {
 setTimeout(resolve, ms);
 });
}
window.esperar = esperar;

async function cargarPublicaciones(forzarError = false) {
 estado.textContent = "Cargando publicaciones...";
 botonActualizar.disabled = true;
 try {
 const url = forzarError ? "/api/publicaciones?error=1" : "/api/publicaciones";
 const respuesta = await fetch(url);
 if (!respuesta.ok) throw new Error("La respuesta no fue exitosa");
 const datos = await respuesta.json();
 repositorio.cargarDesde(datos);
 renderizarPublicaciones();
 estado.textContent = `${datos.length} publicaciones recibidas`;
 } catch (error) {
 estado.textContent = `Error: ${error.message}`;
 } finally {
 botonActualizar.disabled = false;
 }
}

botonActualizar.addEventListener("click", () => cargarPublicaciones(false));
botonForzarError.addEventListener("click", () => cargarPublicaciones(true));

const enviar = document.getElementById("enviar");

function formularioValido() {
 const precioInput = document.getElementById("precio");
 const precioValido = tipo.value !== "venta" || (precioInput && Number(precioInput.value) > 0);
 return titulo.value.trim().length >= 5
 && autor.value.trim().length >= 3
 && precioValido;
}

function actualizarEstadoFormulario() {
 enviar.disabled = !formularioValido();
}

formulario.addEventListener("input", actualizarEstadoFormulario);