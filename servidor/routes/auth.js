// RUTAS AUTENTICAR USUARIOS
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// /api/auth
// check de express validator agrega chequeo y mensajes de error
router.post("/", authController.autenticarUsuario);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
