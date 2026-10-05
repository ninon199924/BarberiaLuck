
// function Reservar_Turno({ turnos, setTurnos }) {
//   //const [fecha, setFecha] = useState("");
//   //const [rango, setRango] = useState("");
//   //const [hora, setHora] = useState("");
//   const [reserva, setReserva] = useState({
//     servicio: "",
//     profesional: "",
//     fecha: "",
//     horario: "",
//   });

//   const actualizarReserva = (campo, valor) => {
//     setReserva((prev) => ({
//         ...prev,
//         [campo]: valor,
//     }));
//   };


//   function Turno(e) {
//     e.preventDefault();

//     const nuevoTurno = {
//       id: turnos.length + 1,
//       fecha: reserva.fecha,
//       rango: rango,
//       hora: reserva.horario,
//     };

//fetch("http://localhost:3000/turnos",{
//method: "POST",
//headers: {
//"Content-Type": "application/json",
//},
//body: JSON.stringify(nuevoTurno),
//})
// .then(respuesta => respuesta.json())
// .then(datos => {
//   setTurnos(datos);
// });
//     useEffect(() => {

//     obtenerTurnos()

//         .then(setTurnos)

//         .catch(console.error);

// }, []);

// setTurnos([...turnos, nuevoTurno]);
//  }

// return (
//   <div>
//     <nav className="navbar">
//       <Link to="/Registro">Registrarse</Link>
//       <Link to="/Formulario_general">Iniciar Sesion</Link>
//       <Link to="/Recuperar_password">¿Olvidaste tu contraseña?</Link>
//       <Link to="/Contacto">Contacto</Link>
//       <Link to="/Administracion">Administracion</Link>
//     </nav>
//     <form onSubmit={Turno} className="formRegistro">

//       <label>Seleccione un Turno</label>
//       <input type="date"
//       placeholder="Fecha"
//       value={fecha}
//       onChange={(e) => setFecha(e.target.value)}
//       />

//       <select value={rango}
//       onChange={(e) => setRango(e.target.value)}
//       >
//         <option>Mañana</option>
//         <option>Tarde</option>
//       </select>



//       <select value={hora}
//       onChange={(e) => setHora(e.target.value)}
//       >
//         <option>9:00</option>
//         <option>10:00</option>
//         <option>11:00</option>
//         <option>12:00</option>
//         <option>13:00</option>
//         <option>14:00</option>
//         <option>15:00</option>
//         <option>16:00</option>
//         <option>17:00</option>
//         <option>18:00</option>
//         <option>19:00</option>
//         <option>20:00</option>
//       </select>

//       <button type="submit">Reservar Turno</button>
//     </form>
//   </div>


// );
// }
import { useEffect, useState } from "react";
import "./Reservar_turno.css";

export default function Reservar_turno() {

  const [reserva, setReserva] = useState({
    servicio: "",
    profesional: "",
    fecha: "",
    horario: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [cargandoServicios, setCargandoServicios] = useState(true);
  const [profesionales, setProfesionales] = useState([]);
  const [cargandoProfesionales, setCargandoProfesionales] = useState(true);
  const [horariosOcupados, setHorariosOcupados] = useState([]);


  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const [respuestaServicios, respuestaProfesionales] =
          await Promise.all([
            fetch("http://localhost:3000/servicios"),
            fetch("http://localhost:3000/profesionales")
          ]);

        if (!respuestaServicios.ok) {
          throw new Error("No se pudieron cargar los servicios.");
        }

        if (!respuestaProfesionales.ok) {
          throw new Error("No se pudieron cargar los profesionales.");
        }

        const datosServicios = await respuestaServicios.json();
        const datosProfesionales = await respuestaProfesionales.json();

        setServicios(datosServicios);
        setProfesionales(datosProfesionales);

      } catch (error) {

        console.error("Error al cargar datos:", error);

        setError("No se pudieron cargar los datos.");

      } finally {

        setCargandoServicios(false);
        setCargandoProfesionales(false);

      }
    };

    cargarDatos();

  }, []);



  const actualizarCampo = (campo, valor) => {
    setReserva((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const cargarHorariosOcupados = async () => {
    if (!reserva.fecha || !reserva.profesional) {
      setHorariosOcupados([]);
      return;
    }

    try {
      const respuesta = await fetch(
        `http://localhost:3000/turnos/disponibilidad?fecha=${reserva.fecha}&id_profesional=${reserva.profesional}`
      );

      if (!respuesta.ok) {
        throw new Error(
          "No se pudo consultar la disponibilidad."
        );
      }

      const datos = await respuesta.json();

      const horarios = datos.map((turno) =>
        turno.hora.substring(0, 5)
      );

      setHorariosOcupados(horarios);

      // Si el horario seleccionado quedó ocupado,
      // lo limpiamos.
      if (horarios.includes(reserva.horario)) {
        setReserva((prev) => ({
          ...prev,
          horario: ""
        }));
      }

    } catch (error) {
      console.error(
        "Error al consultar disponibilidad:",
        error
      );

      setHorariosOcupados([]);
    }
  };

  useEffect(() => {
    cargarHorariosOcupados();
}, [reserva.fecha, reserva.profesional]);

  const confirmarReserva = async (e) => {

    e.preventDefault();

    setMensaje("");
    setError("");

    // Validar campos
    if (
      !reserva.servicio ||
      !reserva.profesional ||
      !reserva.fecha ||
      !reserva.horario
    ) {
      setError("Completá todos los campos.");
      return;
    }

    // Obtener token del usuario
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Debés iniciar sesión para reservar un turno.");
      return;
    }

    // Convertir los valores seleccionados a IDs
    const idServicio = Number(reserva.servicio);
    const idProfesional = Number(reserva.profesional);

    setCargando(true);

    try {

      const respuesta = await fetch(
        "http://localhost:3000/turnos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },

          body: JSON.stringify({
            id_profesional: idProfesional,
            id_servicio: idServicio,
            fecha: reserva.fecha,
            hora: reserva.horario,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || "No se pudo realizar la reserva."
        );
      }

      setMensaje(
        `¡Turno reservado correctamente! Número de turno: ${datos.id_turno}`
      );

      // Limpiar formulario
      setReserva({
        servicio: "",
        profesional: "",
        fecha: "",
        horario: "",
      });

    } catch (error) {

      console.error("Error al reservar:", error);

      setError(error.message);

    } finally {

      setCargando(false);

    }
  };

  const horarios = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "15:30",
    "16:00"
  ];


  return (
    <div className="reserva-container">

      <h1>Reservar turno</h1>

      <form onSubmit={confirmarReserva}>

        <label>Servicio</label>

        <select
          value={reserva.servicio}
          onChange={(e) =>
            actualizarCampo("servicio", e.target.value)
          }
          disabled={cargandoServicios}
        >
          <option value="">
            {cargandoServicios
              ? "Cargando servicios..."
              : "Seleccione un servicio..."
            }
          </option>

          {servicios.map((servicio) => (
            <option
              key={servicio.id_servicio}
              value={servicio.id_servicio}
            >
              {servicio.nombre}
            </option>
          ))}
        </select>


        <label>Profesional</label>

        <select
          value={reserva.profesional}
          onChange={(e) =>
            actualizarCampo("profesional", e.target.value)
          }
          disabled={cargandoProfesionales}
        >
          <option value="">
            {cargandoProfesionales
              ? "Cargando profesionales..."
              : "Seleccione un profesional..."
            }
          </option>

          {profesionales.map((profesional) => (
            <option
              key={profesional.id_profesional}
              value={profesional.id_profesional}
            >
              {profesional.nombre} {profesional.apellido}
            </option>
          ))}
        </select>


        <label>Fecha</label>

        <input
          type="date"
          value={reserva.fecha}
          onChange={(e) =>
            actualizarCampo("fecha", e.target.value)
          }
        />


        <label>Horario</label>

        <select
          value={reserva.horario}
          onChange={(e) =>
            actualizarCampo("horario", e.target.value)
          }
          disabled={!reserva.fecha || !reserva.profesional}
        >
          <option value="">
            {!reserva.fecha || !reserva.profesional
              ? "Seleccione profesional y fecha"
              : "Seleccione un horario"
            }
          </option>

          {horarios.map((hora) => {

            const ocupado = horariosOcupados.includes(hora);

            return (
              <option
                key={hora}
                value={hora}
                disabled={ocupado}
              >
                {hora} {ocupado ? "— Ocupado" : ""}
              </option>
            );

          })}

        </select>

        <button
          type="submit"
          disabled={cargando}
        >

          {cargando
            ? "Reservando..."
            : "Confirmar reserva"}

        </button>


        {mensaje && (
          <p className="mensaje-exito">
            {mensaje}
          </p>
        )}


        {error && (
          <p className="mensaje-error">
            {error}
          </p>
        )}

      </form>

    </div>
  );
}