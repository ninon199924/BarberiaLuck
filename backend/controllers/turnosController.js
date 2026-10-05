const conexion = require("../db/conexion");

const obtenerTurnosPorFechaProfesional = (req, res) => {

    const { fecha, id_profesional } = req.query;

    if (!fecha || !id_profesional) {
        return res.status(400).json({
            mensaje: "La fecha y el profesional son obligatorios."
        });
    }

    const sql = `
        SELECT hora
        FROM turnos
        WHERE fecha = ?
        AND id_profesional = ?
        AND estado IN ('pendiente', 'confirmado')
        ORDER BY hora
    `;

    conexion.query(
        sql,
        [fecha, id_profesional],
        (error, resultados) => {

            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: "Error al obtener los horarios ocupados."
                });
            }

            res.json(resultados);
        }
    );
};

const crearTurno = (req, res) => {

    if (!req.usuario || !req.usuario.id) {
        return res.status(401).json({
            mensaje: "Usuario no autenticado."
        });
    }

    const {
        id_profesional,
        id_servicio,
        fecha,
        hora
    } = req.body;


    const id_usuario = req.usuario.id;

    if (
        !id_profesional ||
        !id_servicio ||
        !fecha ||
        !hora
    ) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

    // Primero comprobamos si el horario ya está ocupado
    const sqlVerificar = `
        SELECT id_turno
        FROM turnos
        WHERE id_profesional = ?
        AND fecha = ?
        AND hora = ?
        AND estado IN ('pendiente', 'confirmado')
        LIMIT 1
    `;

    conexion.query(
        sqlVerificar,
        [id_profesional, fecha, hora],
        (error, resultados) => {

            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: "Error al verificar la disponibilidad."
                });
            }

            // Ya existe un turno
            if (resultados.length > 0) {
                return res.status(409).json({
                    mensaje: "El horario seleccionado ya está ocupado."
                });
            }

            // Si está disponible, creamos el turno
            const sqlInsertar = `
                INSERT INTO turnos
                (id_usuario, id_profesional, id_servicio, fecha, hora)
                VALUES (?, ?, ?, ?, ?)
            `;

            conexion.query(
                sqlInsertar,
                [
                    id_usuario,
                    id_profesional,
                    id_servicio,
                    fecha,
                    hora
                ],
                (error, resultado) => {

                    if (error) {
                        console.error(error);

                        return res.status(500).json({
                            mensaje: "Error al crear el turno."
                        });
                    }

                    res.status(201).json({
                        mensaje: "Turno reservado correctamente.",
                        id_turno: resultado.insertId
                    });

                }
            );

        }
    );
};

const obtenerMisTurnos = (req, res) => {
    const id_usuario = req.usuario.id;

    const sql = `
        SELECT
            t.id_turno,
            t.fecha,
            t.hora,
            t.estado,
            s.nombre AS servicio,
            s.precio,
            s.duracion,
            CONCAT(p.nombre, ' ', p.apellido) AS profesional
        FROM turnos t
        INNER JOIN servicios s
            ON t.id_servicio = s.id_servicio
        INNER JOIN profesionales p
            ON t.id_profesional = p.id_profesional
        WHERE t.id_usuario = ?
        ORDER BY t.fecha DESC, t.hora DESC
    `;

    conexion.query(
        sql,
        [id_usuario],
        (error, resultados) => {
            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: "Error al obtener tus turnos."
                });
            }

            res.json(resultados);
        }
    );
};

const cancelarTurno = (req, res) => {
    const id_usuario = req.usuario.id;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            mensaje: "El ID del turno es obligatorio."
        });
    }

    const sql = `
        UPDATE turnos
        SET estado = 'cancelado'
        WHERE id_turno = ?
        AND id_usuario = ?
        AND estado IN ('pendiente', 'confirmado')
    `;

    conexion.query(
        sql,
        [id, id_usuario],
        (error, resultado) => {
            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: "Error al cancelar el turno."
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Turno no encontrado o no se puede cancelar."
                });
            }

            res.json({
                mensaje: "Turno cancelado correctamente."
            });
        }
    );
};

const cancelarTurnoAdmin = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE turnos
        SET estado = 'cancelado'
        WHERE id_turno = ?
        AND estado IN ('pendiente', 'confirmado')
    `;

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error al cancelar el turno."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Turno no encontrado o no se puede cancelar."
            });
        }

        res.json({
            mensaje: "Turno cancelado correctamente."
        });
    });
};

const obtenerTodosLosTurnos = (req, res) => {

    const sql = `
        SELECT
            t.id_turno,
            t.fecha,
            t.hora,
            t.estado,

            u.id_usuario,
            u.nombre AS nombre_usuario,
            u.apellido AS apellido_usuario,

            p.id_profesional,
            p.nombre AS nombre_profesional,
            p.apellido AS apellido_profesional,

            s.id_servicio,
            s.nombre AS servicio,
            s.precio,
            s.duracion

        FROM turnos t

        INNER JOIN usuarios u
            ON t.id_usuario = u.id_usuario

        INNER JOIN profesionales p
            ON t.id_profesional = p.id_profesional

        INNER JOIN servicios s
            ON t.id_servicio = s.id_servicio

        WHERE t.estado IN ('pendiente', 'confirmado')

        ORDER BY t.fecha ASC, t.hora ASC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error al obtener los turnos."
            });
        }

        res.json(resultados);
    });
};

const confirmarTurno = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE turnos
        SET estado = 'confirmado'
        WHERE id_turno = ?
        AND estado = 'pendiente'
    `;

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error al confirmar el turno."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "El turno no existe o ya no está pendiente."
            });
        }

        res.json({
            mensaje: "Turno confirmado correctamente."
        });
    });
};

module.exports = {
    crearTurno,
    obtenerTurnosPorFechaProfesional,
    obtenerMisTurnos,
    cancelarTurno,
    obtenerTodosLosTurnos,
    confirmarTurno,
    cancelarTurnoAdmin
};