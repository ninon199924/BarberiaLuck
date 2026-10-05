const jwt = require("jsonwebtoken");
const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const obtenerUsuarios = (req, res) => {
    conexion.query("SELECT * FROM usuarios", (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

const crearUsuario = async (req, res) => {

    const {
        nombre,
        apellido,
        email,
        telefono,
        password,
        rol
    } = req.body;

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO usuarios
        (nombre, apellido, email, telefono, password, rol)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [
            nombre,
            apellido,
            email,
            telefono,
            passwordEncriptada,
            rol || "cliente"
        ],
        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.status(201).json({
                mensaje: "Usuario creado correctamente",
                id: resultado.insertId
            });

        }
    );
};

const login = async (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    conexion.query(sql, [email], async (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const usuario = resultados[0];

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        // Generar el token
        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        // Respuesta
        res.json({
            mensaje: "Login correcto",
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol
            }
        });



    });

};

const verificarEmail = (req, res) => {

    const { email } = req.params;

    const sql = "SELECT id_usuario FROM usuarios WHERE email = ?";

    conexion.query(sql, [email], (error, resultados) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error del servidor"
            });
        }

        res.json({
            existe: resultados.length > 0
        });

    });


};

const solicitarRecuperacion = (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            mensaje: "El correo electrónico es obligatorio."
        });
    }

    const sqlUsuario = `
        SELECT id_usuario, nombre
        FROM usuarios
        WHERE email = ?
    `;

    conexion.query(sqlUsuario, [email], (error, resultados) => {

        if (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Error del servidor."
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: "No existe un usuario con ese correo."
            });
        }

        const usuario = resultados[0];

        // Generar código de 6 dígitos
        const codigo = crypto
            .randomInt(100000, 1000000)
            .toString();

        // El código vence en 15 minutos
        const fechaExpiracion = new Date(
            Date.now() + 15 * 60 * 1000
        );

        // Invalidar códigos anteriores
        const sqlInvalidar = `
            UPDATE recuperacion_password
            SET usado = TRUE
            WHERE id_usuario = ?
            AND usado = FALSE
        `;

        conexion.query(
            sqlInvalidar,
            [usuario.id_usuario],
            (error) => {

                if (error) {
                    console.error(error);

                    return res.status(500).json({
                        mensaje: "Error al preparar la recuperación."
                    });
                }

                const sqlInsertar = `
                    INSERT INTO recuperacion_password
                    (id_usuario, codigo, fecha_expiracion)
                    VALUES (?, ?, ?)
                `;

                conexion.query(
                    sqlInsertar,
                    [
                        usuario.id_usuario,
                        codigo,
                        fechaExpiracion
                    ],
                    async (error) => {

                        if (error) {
                            console.error(error);

                            return res.status(500).json({
                                mensaje: "Error al generar el código."
                            });
                        }

                        // Configuración del correo
                        const mailOptions = {
                            from: `"Barbería Luck" <${process.env.EMAIL_USER}>`,
                            to: email,
                            subject: "Código para recuperar tu contraseña",
                            text: `
Hola ${usuario.nombre},

Recibimos una solicitud para cambiar la contraseña de tu cuenta en Barbería Luck.

Tu código de recuperación es:

${codigo}

Este código tiene una validez de 15 minutos.

Si no solicitaste este cambio, podés ignorar este correo.

Saludos,
Barbería Luck
                            `
                        };

                        try {

                            await transporter.sendMail(mailOptions);

                            res.json({
                                mensaje: "Se envió un código de recuperación a tu correo."
                            });

                        } catch (error) {

                            console.error(
                                "Error al enviar correo:",
                                error
                            );

                            return res.status(500).json({
                                mensaje: "No se pudo enviar el correo de recuperación."
                            });
                        }
                    }
                );
            }
        );
    });
};

const restablecerPassword = async (req, res) => {

    const {
        email,
        codigo,
        nuevaPassword
    } = req.body;

    if (!email || !codigo || !nuevaPassword) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

    if (nuevaPassword.length < 6) {
        return res.status(400).json({
            mensaje:
                "La contraseña debe tener al menos 6 caracteres."
        });
    }

    const sql = `
        SELECT
            r.id_recuperacion,
            r.id_usuario,
            r.codigo,
            r.fecha_expiracion,
            r.usado
        FROM recuperacion_password r

        INNER JOIN usuarios u
            ON r.id_usuario = u.id_usuario

        WHERE u.email = ?
        AND r.codigo = ?
        AND r.usado = FALSE

        ORDER BY r.id_recuperacion DESC

        LIMIT 1
    `;

    conexion.query(
        sql,
        [email, codigo],
        async (error, resultados) => {

            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: "Error del servidor."
                });
            }

            if (resultados.length === 0) {
                return res.status(400).json({
                    mensaje:
                        "Código incorrecto o ya utilizado."
                });
            }

            const recuperacion = resultados[0];

            const ahora = new Date();

            if (
                new Date(recuperacion.fecha_expiracion) <
                ahora
            ) {
                return res.status(400).json({
                    mensaje: "El código ha expirado."
                });
            }

            const passwordEncriptada =
                await bcrypt.hash(nuevaPassword, 10);

            const sqlActualizar = `
                UPDATE usuarios
                SET password = ?
                WHERE id_usuario = ?
            `;

            conexion.query(
                sqlActualizar,
                [
                    passwordEncriptada,
                    recuperacion.id_usuario
                ],
                (error) => {

                    if (error) {
                        console.error(error);

                        return res.status(500).json({
                            mensaje:
                                "No se pudo actualizar la contraseña."
                        });
                    }

                    const sqlUsarCodigo = `
                        UPDATE recuperacion_password
                        SET usado = TRUE
                        WHERE id_recuperacion = ?
                    `;

                    conexion.query(
                        sqlUsarCodigo,
                        [recuperacion.id_recuperacion],
                        (error) => {

                            if (error) {
                                console.error(error);

                                return res.status(500).json({
                                    mensaje:
                                        "La contraseña cambió, pero hubo un error al cerrar el código."
                                });
                            }

                            res.json({
                                mensaje:
                                    "Contraseña cambiada correctamente."
                            });

                        }
                    );
                }
            );
        }
    );
};


module.exports = {
    obtenerUsuarios,
    crearUsuario,
    login,
    verificarEmail,
    solicitarRecuperacion,
    restablecerPassword
};