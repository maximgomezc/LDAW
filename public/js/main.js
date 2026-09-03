import {PublicacionVenta} from "./PublicacionVenta.js";
import {PublicacionServicio} from "./PublicacionServicio.js";
import {usuario} from "./usuario.js";

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

function actualizarVistaPrevia() {
 const nombre = autor.value || "Autor";
 const texto = titulo.value || "Sin título";
 vistaPrevia.textContent = `${texto} — ${nombre} (${tipo.value})`;
}
titulo.addEventListener("input", actualizarVistaPrevia);
autor.addEventListener("input", actualizarVistaPrevia);
tipo.addEventListener("change", actualizarVistaPrevia);

function actualizarCamposEspecificos() {
 if (tipo.value === "venta") {
 camposEspecificos.innerHTML = `
 <input id="precio" type="number" placeholder="Precio">
 <input id="stock" type="number" value="1">`;
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

const publicaciones = [];
function agregarTarjeta(publicacion) {
 const tarjeta = document.createElement("article");
 const tituloTarjeta = document.createElement("h2");
 const descripcionTarjeta = document.createElement("p");
 const estado = document.createElement("span");
 const boton = document.createElement("button");
 const botonDestacar = document.createElement("button");

 tituloTarjeta.textContent = publicacion.titulo;
 descripcionTarjeta.textContent = publicacion.mostrarResumen();
 estado.textContent = "Activa";
 boton.textContent = "Dar de baja";
 botonDestacar.textContent = "Destacar";
 
 tarjeta.dataset.id = publicaciones.indexOf(publicacion);
 boton.dataset.accion = "baja";
 botonDestacar.dataset.accion = "destacar";

 tarjeta.append(tituloTarjeta, descripcionTarjeta, estado, boton, botonDestacar);
 listaPublicaciones.appendChild(tarjeta);

    function manejarBaja(evento) {
    console.log(evento.type, evento.target);
    publicacion.darDeBaja();
    estado.textContent = "Inactiva";
    boton.disabled = true;
    }
    boton.addEventListener("click", manejarBaja);

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
function manejarEnvio(evento) {
 evento.preventDefault();
 const publicacion = crearPublicacionDesdeFormulario();
 publicaciones.push(publicacion);
 agregarTarjeta(publicacion);
 formulario.reset();
 actualizarCamposEspecificos();
 actualizarVistaPrevia();
}
formulario.addEventListener("submit", manejarEnvio);

function manejarAccion(evento) {
 const boton = evento.target.closest("button[data-accion]");
 if (!boton || !listaPublicaciones.contains(boton)) return;
 const tarjeta = boton.closest("[data-id]");
 const id = Number(tarjeta.dataset.id);
 console.log(id, boton.dataset.accion);
}
listaPublicaciones.addEventListener("click", manejarAccion);