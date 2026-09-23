import Publicacion from "../src/publicacion.js";
describe("Publicacion", () => {
    test("valida el autor, el título y la descripción con la regla del contrato de la clase 16", () => {
        expect(() => new Publicacion("   ", "Titulo valido", "Descripcion valida con mas de 20 caracteres", "general")).toThrow("El autor es obligatorio");
        expect(() => new Publicacion("Ana", "1234", "Descripcion valida con mas de 20 caracteres", "general")).toThrow("El título debe tener entre 5 y 80 caracteres");
        expect(() => new Publicacion("Ana", "Titulo valido", "Descripcion corta", "general")).toThrow("La descripcion debe tener entre 20 y 500 caracteres");
        expect(() => new Publicacion("Ana", "Titulo valido", "Descripcion valida con mas de 20 caracteres", "inexistente")).toThrow("La categoría debe ser una de");
    });

    test("normaliza espacios al crear la publicación", () => {
        const publicacion = new Publicacion("  Ana  ", "  Titulo valido  ", "  Descripcion valida con mas de 20 caracteres  ", "general");
        expect(publicacion.autor).toBe("Ana");
        expect(publicacion.titulo).toBe("Titulo valido");
        expect(publicacion.descripcion).toBe("Descripcion valida con mas de 20 caracteres");
        expect(publicacion.categoria).toBe("general");
    });

    test("acepta los límites exactos y rechaza los fuera de rango", () => {
        expect(() => new Publicacion("Ana", "12345", "Descripcion valida con mas de 20 caracteres", "general")).not.toThrow();
        expect(() => new Publicacion("Ana", "1234", "Descripcion valida con mas de 20 caracteres", "general")).toThrow();
        expect(() => new Publicacion("Ana", "a".repeat(80), "Descripcion valida con mas de 20 caracteres", "general")).not.toThrow();
        expect(() => new Publicacion("Ana", "a".repeat(81), "Descripcion valida con mas de 20 caracteres", "general")).toThrow();
        expect(() => new Publicacion("Ana", "Titulo valido", "x".repeat(20), "general")).not.toThrow();
        expect(() => new Publicacion("Ana", "Titulo valido", "x".repeat(19), "general")).toThrow();
        expect(() => new Publicacion("Ana", "Titulo valido", "x".repeat(500), "general")).not.toThrow();
        expect(() => new Publicacion("Ana", "Titulo valido", "x".repeat(501), "general")).toThrow();
    });

    test("una publicación nueva comienza activa y sin etiquetas", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    expect(publicacion.activa).toBe(true);
    expect(publicacion.etiquetas).toEqual([]);
    });
    test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta(" redes ");
    expect(publicacion.etiquetas).toEqual(["redes"]);
    });
    test("darDeBaja cambia activa a false", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.darDeBaja();
    expect(publicacion.activa).toBe(false);
    });
    test("una etiqueta repetida no se agrega dos veces", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta("redes");
    publicacion.agregarEtiqueta("redes");
    expect(publicacion.etiquetas).toEqual(["redes"]);
    });
    test("una etiqueta vacía lanza el error esperado", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    expect(() => publicacion.agregarEtiqueta(" ")).toThrow("Etiqueta inválida");
    });
    test("tieneEtiqueta ignora mayúsculas y minúsculas", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta("Redes");
    expect(publicacion.tieneEtiqueta("redes")).toBe(true);
    });
});