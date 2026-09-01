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
