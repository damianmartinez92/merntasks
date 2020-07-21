// RUTAS AUTENTICAR USUARIOS
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

// check de express validator agrega chequeo y mensajes de error
router.post(
  "/",
  [
    check("email", "Agrega un email válido.").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres.").isLength({
      min: 6,
    }),
  ],
  authController.autenticarUsuario
);

module.exports = router;
