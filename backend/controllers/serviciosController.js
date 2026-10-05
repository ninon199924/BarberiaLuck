const conexion = require("../db/conexion");

const obtenerServicios = (req, res) => {

    const sql = `
        SELECT
            id_servicio,
            nombre,
            descripcion,
            precio,
            duracion
        FROM servicios
        WHERE activo = 1
        ORDER BY nombre
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error al obtener los servicios."
            });
        }

        res.json(resultados);
    });
};

module.exports = {
    obtenerServicios
};