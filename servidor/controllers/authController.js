const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // Revisa si hay errores con express-validator
  const errors = validationResult(req);
  // Chequea si errors NO esta vacio, entonces se muestran los errores
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  // Extrae email y pass del body
  const { email, password } = req.body;
  try {
    // Chequea que sea un usuario regsitrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).send({ msg: "El usuario no existe." });
    }
    // Si el usuario existe, chequeamos password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).send({ msg: "Password incorrecto." });
    }

    // Si el email y pass coincide entonces seteamos token
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    // Firmar JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, // tiempo de expiracion, 3600 = 1 hora
      },
      (error, token) => {
        if (error) throw error;

        // Enviamos token como respuesta si se genera correctamente
        // Ir a jwt.io y descomprimir token y vamos a tener el id de usuario
        res.json({ token });
      }
    );


  } catch (error) {
    console.log(error);
  }
};
