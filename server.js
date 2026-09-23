import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RepositorioPublicaciones } from "./src/RepositorioPublicaciones.js";
import Publicacion from "./src/publicacion.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const repositorio = new RepositorioPublicaciones();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));

app.get("/favicon.ico", (req, res) => {
 res.sendStatus(204);
});

app.get("/estado-comunidad", (req, res) => {
 res.send(repositorio.obtenerEstado());
});

app.post("/publicaciones", (req, res) => {
 try {
   const publicacion = new Publicacion(
     req.body.autor,
     req.body.titulo,
     req.body.descripcion,
     req.body.categoria
   );

   repositorio.agregar(publicacion);
   res.status(201).send(publicacion.mostrarResumen());
 } catch (error) {
   res.status(400).send(error.message);
 }
});

app.listen(3000, () => {
 console.log("Servidor disponible en http://localhost:3000");
});
