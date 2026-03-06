const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; 

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado: falta token'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado: formato de token inválido'
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // aquí guarda el usuario decodificado para usarlo en controladores
    req.usuario = decoded; // {id, email, rol, iat, exp}
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado: token inválido o expirado'
    });
  }
};