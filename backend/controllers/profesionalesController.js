const conexion = require("../db/conexion");

const obtenerProfesionales = (req, res) => {

    const sql = `
        SELECT
            id_profesional,
            nombre,
            apellido,
            especialidad
        FROM profesionales
        WHERE activo = 1
        ORDER BY nombre, apellido
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error al obtener los profesionales."
            });
        }

        res.json(resultados);
    });
};

module.exports = {
    obtenerProfesionales
};