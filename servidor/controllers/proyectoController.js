const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crea un proyecto nuevo segun el usuario que este registrado
exports.crearProyecto = async (req, res) => {
  // Revisa si hay errores con express-validator
  const errors = validationResult(req);
  // Chequea si errors NO esta vacio, entonces se muestran los errores
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    // Crea nuevo proyecto
    const proyecto = new Proyecto(req.body);
    // Seteamos el creador via JWT despues del middleware de auth
    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error." });
  }
};

// Obtiene todos los proyectos del USUARIO ACTUAL
exports.obtenerProyectos = async (req, res) => {
  try {
    // En req.usuario.id tenemos el id de usuario ya validado
    const proyectos = await Proyecto.find({ creador: req.usuario.id });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.actualizarProyecto = async (req, res) => {
  // Chequea errores de express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  // Tomamos los valores del req.body
  const { nombre } = req.body;
  const nuevoProyecto = {};

  // Chequeamos si nombre existe, y creamos el objeto nuevo
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // Revisa el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // Si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Verifica el creador
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Actualiza
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    // Revisa el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // Si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Verifica el creador
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Elimina proyecto
    await Proyecto.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado con exito." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
