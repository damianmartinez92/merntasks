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


  
};
