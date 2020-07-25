const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const tareaController = require("../controllers/tareaController");

// /api/tareas
// Creacion de Tarea
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("proyecto", "El Proyecto es obligatorio.").not().isEmpty(),
  ],
  tareaController.crearTarea
);

// Obtiene todas las tareas del proyecto
router.get("/", auth, tareaController.obtenerTareas);

// Actualizar tarea
router.put("/:id", auth, tareaController.actualizarTarea);

// Elimina una tarea
router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
