const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/auth");

const {
    obtenerUsuarios,
    crearUsuario,
    login,
    verificarEmail,
    solicitarRecuperacion,
    restablecerPassword
} = require("../controllers/usuariosController");

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.post("/login", login);
router.get("/verificar-email/:email", verificarEmail);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer-password", restablecerPassword);
router.get("/perfil", verificarToken, (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

});



module.exports = router;