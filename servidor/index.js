const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

// Rutas
app.get("/", (req, res) => {
  res.send("Hola");
});

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
