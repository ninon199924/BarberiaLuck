import { useEffect, useState } from "react";
import "./Administracion.css";

function Administracion({ turnos = [], setTurnos }) {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarTurnos = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("No hay una sesión iniciada.");
            setCargando(false);
            return;
        }

        try {

            const respuesta = await fetch(
                "http://localhost:3000/turnos/admin",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || "No se pudieron cargar los turnos."
                );
            }

            setTurnos(datos);

        } catch (error) {

            console.error("Error al cargar turnos:", error);
            setError(error.message);

        } finally {

            setCargando(false);
        }
    };


    useEffect(() => {
        cargarTurnos();
    }, []);


    const confirmarTurno = async (idTurno) => {

        const token = localStorage.getItem("token");

        try {

            const respuesta = await fetch(
                `http://localhost:3000/turnos/admin/${idTurno}/confirmar`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || "No se pudo confirmar el turno."
                );
            }

            alert(datos.mensaje);

            // Volvemos a cargar los turnos
            cargarTurnos();

        } catch (error) {

            console.error("Error al confirmar turno:", error);
            alert(error.message);
        }
    };

    const cancelarTurno = async (idTurno) => {

        const confirmar = window.confirm(
            "¿Estás seguro de que querés cancelar este turno?"
        );

        if (!confirmar) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const respuesta = await fetch(
                `http://localhost:3000/turnos/admin/${idTurno}/cancelar`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || "No se pudo cancelar el turno."
                );
            }

            alert(datos.mensaje);

            cargarTurnos();

        } catch (error) {

            console.error("Error al cancelar turno:", error);
            alert(error.message);
        }
    };

    if (cargando) {
        return (
            <div className="Administracion">
                <h1>Administración</h1>
                <p>Cargando turnos...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="Administracion">
                <h1>Administración</h1>
                <p>{error}</p>
            </div>
        );
    }


    return (
        <div className="Administracion">

            <h1>Administración de turnos</h1>

            {turnos.length === 0 ? (

                <p>No hay turnos pendientes o confirmados.</p>

            ) : (
                <div className="tabla-contenedor">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th>Profesional</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {turnos.map((t) => (

                                <tr key={t.id_turno}>

                                    <td>{t.id_turno}</td>

                                    <td>
                                        {new Date(t.fecha).toLocaleDateString("es-AR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </td>

                                    <td>{t.hora}</td>

                                    <td>
                                        {t.nombre_usuario}{" "}
                                        {t.apellido_usuario}
                                    </td>

                                    <td>
                                        {t.servicio}
                                    </td>

                                    <td>
                                        {t.nombre_profesional}{" "}
                                        {t.apellido_profesional}
                                    </td>

                                    <td>
                                        <span className={`estado estado-${t.estado}`}>
                                            {t.estado}
                                        </span>
                                    </td>

                                    <td>

                                        {t.estado === "pendiente" && (

                                            <button
                                                className="boton-confirmar"
                                                onClick={() =>
                                                    confirmarTurno(t.id_turno)
                                                }
                                            >
                                                Confirmar
                                            </button>
                                        )}

                                        {t.estado === "confirmado" && (
                                            <span className="confirmado-texto">
                                                ✓ Confirmado
                                            </span>
                                        )}

                                        {(t.estado === "pendiente" ||
                                            t.estado === "confirmado") && (

                                                <button
                                                    className="boton-cancelar"
                                                    onClick={() =>
                                                        cancelarTurno(t.id_turno)
                                                    }
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
            )}


        </div>
    );
}

export default Administracion;