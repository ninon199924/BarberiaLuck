const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/admin");

const {
    crearTurno,
    obtenerTurnosPorFechaProfesional,
    obtenerMisTurnos,
    cancelarTurno,
    obtenerTodosLosTurnos,
    confirmarTurno,
    cancelarTurnoAdmin
} = require("../controllers/turnosController");


// Disponibilidad de horarios
router.get(
    "/disponibilidad",
    obtenerTurnosPorFechaProfesional
);


// Turnos del usuario autenticado
router.get(
    "/mis-turnos",
    verificarToken,
    obtenerMisTurnos
);


// Administración
router.get(
    "/admin",
    verificarToken,
    verificarAdmin,
    obtenerTodosLosTurnos
);

router.put(
    "/admin/:id/confirmar",
    verificarToken,
    verificarAdmin,
    confirmarTurno
);

router.put(
    "/admin/:id/cancelar",
    verificarToken,
    verificarAdmin,
    cancelarTurnoAdmin
);


// Cancelar turno del usuario
router.put(
    "/:id/cancelar",
    verificarToken,
    cancelarTurno
);


// Crear turno
router.post(
    "/",
    verificarToken,
    crearTurno
);


module.exports = router;