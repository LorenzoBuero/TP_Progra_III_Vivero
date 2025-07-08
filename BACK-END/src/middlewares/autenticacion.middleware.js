// middlewares/autenticacion.middleware.js
export function requiereAutenticacion(req, res, next) {
  if (req.session && req.session.usuarioAutenticado) {
    next();
  } else {
    res.status(401).send("No estás autenticado");
  }
}