// middlewares/inyeccion.middleware.js
export function inyeccionInputs(req, res, next) {
  const inyeccion = (value) => {
    if (typeof value === "string") {
      return value.replace(/[\$<>;]/g, ""); // elimina símbolos peligrosos
    } else if (typeof value === "object" && value !== null) {
      for (let key in value) {
        value[key] = inyeccion(value[key]);
      }
    }
    return value;
  };

  req.body = inyeccion(req.body);
  req.query = inyeccion(req.query);
  req.params = inyeccion(req.params);

  next();
}