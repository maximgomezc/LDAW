import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));
app.listen(3000, () => {
 console.log("Gestor en http://localhost:3000");
}); 