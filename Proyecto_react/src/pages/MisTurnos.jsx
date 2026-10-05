import { useEffect, useState } from "react";
import "./MisTurnos.css";

export default function MisTurnos() {
    const [turnos, setTurnos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarTurnos = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Debés iniciar sesión para ver tus turnos.");
                setCargando(false);
                return;
            }

            try {
                const respuesta = await fetch(
                    "http://localhost:3000/turnos/mis-turnos",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
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

        cargarTurnos();
    }, []);

    if (cargando) {
        return <p>Cargando tus turnos...</p>;
    }

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
                `http://localhost:3000/turnos/${idTurno}/cancelar`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || "No se pudo cancelar el turno."
                );
            }

            alert(datos.mensaje);

            // Actualizamos la lista de turnos
            setTurnos((turnosActuales) =>
                turnosActuales.map((turno) =>
                    turno.id_turno === idTurno
                        ? {
                            ...turno,
                            estado: "cancelado",
                        }
                        : turno
                )
            );
        } catch (error) {
            console.error("Error al cancelar turno:", error);
            alert(error.message);
        }
    };

    return (
        <div className="mis-turnos">

            <h1>Mis turnos</h1>

            {error && (
                <p>
                    {error}
                </p>
            )}

            {!error && turnos.length === 0 && (
                <p className="mensaje-vacio">
                    No tenés turnos reservados.
                </p>
            )}

            {turnos.length > 0 && (
                <div className="turnos-lista">

                    {turnos.map((turno) => (

                        <div
                            className="turno-card"
                            key={turno.id_turno}
                        >

                            <h2>
                                Turno #{turno.id_turno}
                            </h2>

                            <p>
                                <strong>Servicio:</strong>{" "}
                                {turno.servicio}
                            </p>

                            <p>
                                <strong>Profesional:</strong>{" "}
                                {turno.profesional}
                            </p>

                            <p>
                                <strong>Fecha:</strong>{" "}
                                {new Date(turno.fecha).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </p>

                            <p>
                                <strong>Hora:</strong>{" "}
                                {turno.hora.substring(0, 5)}
                            </p>

                            <p>
                                <strong>Duración:</strong>{" "}
                                {turno.duracion} minutos
                            </p>

                            <p>
                                <strong>Precio:</strong>{" "}
                                ${turno.precio}
                            </p>

                            <p>
                                <strong>Estado:</strong>{" "}

                                <span
                                    className={`estado estado-${turno.estado}`}
                                >
                                    {turno.estado}
                                </span>
                            </p>

                            {(turno.estado === "pendiente" ||
                                turno.estado === "confirmado") && (

                                    <button
                                        className="boton-cancelar"
                                        onClick={() =>
                                            cancelarTurno(
                                                turno.id_turno
                                            )
                                        }
                                    >
                                        Cancelar turno
                                    </button>

                                )}

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}