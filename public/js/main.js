const formulario = document.getElementById("pedido");
const salida = document.getElementById("salida");

if (formulario && salida) {
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const respuesta = await fetch(formulario.action, {
      method: formulario.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(new FormData(formulario))
    });

    const texto = await respuesta.text();
    salida.textContent = texto;
    salida.dataset.tipo = respuesta.ok ? "exito" : "error";

    if (respuesta.ok) {
      formulario.reset();
    }
  });
}