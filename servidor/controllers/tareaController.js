const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  // Chequea errores en express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Revisar si el proyecto actual pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Crea la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error.");
  }
};

// Obtiene tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Revisar si el proyecto actual pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Envia todas las tareas
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error.");
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada." });
    }

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Revisar si el proyecto actual pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Crea objeto con nueva información
    const nuevaTarea = {};
    if (nombre) nuevaTarea.nombre = nombre;
    if (estado) nuevaTarea.estado = estado;

    // Guarda la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error.");
  }
};

// Elimina una tarea del proyecto
exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.body;

    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada." });
    }

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    // Revisar si el proyecto actual pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado." });
    }

    // Elimina tarea
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada con exito." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error.");
  }
};
