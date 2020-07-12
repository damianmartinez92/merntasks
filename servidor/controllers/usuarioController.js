const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Chequea que no haya dos ususarios con el mismo mail
    let usuario = await Usuario.find({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crea el nuevo usuario
    usuario = new Usuario(req.body);

    // Guarda usuario
    await usuario.save();

    // Mensaje de exito
    res.send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
