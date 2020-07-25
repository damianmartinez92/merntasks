const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Lee el token del header
  const token = req.header("x-auth-token");
  //   console.log(token);

  // Revisa si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay Token, permiso no válido." });
  }

  // Valida el token
  try {
    // Descifra el token que se manda por el header como "x-auth-token"
    const cifrado = jwt.verify(token, process.env.SECRET);
    // Setea el cifrado en el payload
    req.usuario = cifrado.usuario;
    // le indica que siga con el siguiente middleware
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido." });
  }
};
