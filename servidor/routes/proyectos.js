const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");

// /api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio.").not().isEmpty()],
  proyectoController.crearProyecto
);

// Obtiene todos los proyectos del usuario
router.get("/", auth, proyectoController.obtenerProyectos);

// Actualiza proyecto según ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio.").not().isEmpty()],
  proyectoController.actualizarProyecto
);

// Elimina un proyecto según ID
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
