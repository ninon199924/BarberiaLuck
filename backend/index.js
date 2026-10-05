require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuariosRoutes");
const turnosRoutes = require("./routes/turnosRoutes");
const serviciosRoutes = require("./routes/serviciosRoutes");
const profesionalesRoutes = require("./routes/profesionalesRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/turnos", turnosRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/profesionales", profesionalesRoutes);

// Ruta de prueba
app.get("/saludo", (req, res) => {
    res.send("Servidor de Barbería Luck funcionando");
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor de Barbería Luck iniciado en http://localhost:3000");
});