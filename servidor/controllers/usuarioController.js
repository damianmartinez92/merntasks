const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  // Revisa si hay errores con express-validator
  const errors = validationResult(req);
  // Chequea si errors NO esta vacio, entonces se muestran los errores
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  // Tomamos los valores de email y password
  const { email, password } = req.body;

  try {
    // Chequea que no haya dos ususarios con el mismo mail
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crea el nuevo usuario
    usuario = new Usuario(req.body);

    // Hashear el password (bcrypt)
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guarda usuario
    await usuario.save();

    // Crear y firmar el JWT
    // Se le va a mandar como token el usuario id encriptado
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

    // Mensaje de exito
    // res.send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
