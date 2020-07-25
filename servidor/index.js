const express = require("express");
const app = express();

// Llama a la conexion de la base de datos
const conectarDB = require("./config/db");

// Conecta a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extended: true }));

// Configuracion del puerto
const PORT = process.env.PORT || 4000;

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Mensaje de conexion
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
