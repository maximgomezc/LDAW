import Publicacion from "../src/publicacion.js";

describe("Publicacion.revisar", () => {
    test("aprueba la publicación cuando el servicio resuelve aprobado", async () => {
        const servicio = { evaluar: async () => "aprobado" };
        const publicacion = new Publicacion("Apuntes de Redes", "...", "Ana");

        await expect(publicacion.revisar(servicio)).resolves.toBe("aprobada");
        expect(publicacion.estado).toBe("aprobada");
    });

    test("rechaza la publicación cuando el servicio resuelve rechazado", async () => {
        const servicio = { evaluar: async () => "rechazado" };
        const publicacion = new Publicacion("Apuntes de Redes", "...", "Ana");

        await expect(publicacion.revisar(servicio)).resolves.toBe("rechazada");
        expect(publicacion.estado).toBe("rechazada");
    });

    test("conserva el estado pendiente si el servicio falla", async () => {
        const servicio = {
            evaluar: async () => {
                throw new Error("Servicio no disponible");
            },
        };
        const publicacion = new Publicacion("Apuntes de Redes", "...", "Ana");

        await expect(publicacion.revisar(servicio)).rejects.toThrow("Servicio no disponible");
        expect(publicacion.estado).toBe("pendiente");
    });

    test("rechaza una decisión de moderación desconocida sin cambiar el estado", async () => {
        const servicio = { evaluar: async () => "requiere_cambios" };
        const publicacion = new Publicacion("Apuntes de Redes", "...", "Ana");

        await expect(publicacion.revisar(servicio)).rejects.toThrow("Decisión de moderación inválida");
        expect(publicacion.estado).toBe("pendiente");
    });
});