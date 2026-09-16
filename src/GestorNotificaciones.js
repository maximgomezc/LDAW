export class GestorNotificaciones {
    enviar(notificador, mensaje) {
        return notificador.notificar(mensaje);
    }
}

export default GestorNotificaciones;