import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Recuperar_password() {

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);


  const solicitarCodigo = async (e) => {

    e.preventDefault();

    setMensaje("");
    setError("");

    if (!email) {
      setError("Ingresá tu correo electrónico.");
      return;
    }

    setCargando(true);

    try {

      const respuesta = await fetch(
        "http://localhost:3000/usuarios/recuperar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje ||
          "No se pudo solicitar el código."
        );
      }

      setMensaje(
        "Se envió un código de recuperación a tu correo electrónico."
      );

      setCodigoEnviado(true);

    } catch (error) {

      console.error(
        "Error al solicitar recuperación:",
        error
      );

      setError(error.message);

    } finally {

      setCargando(false);
    }
  };


  const cambiarPassword = async (e) => {

    e.preventDefault();

    setMensaje("");
    setError("");

    if (!codigo || !nuevaPassword || !confirmarPassword) {
      setError("Completá todos los campos.");
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {

      const respuesta = await fetch(
        "http://localhost:3000/usuarios/restablecer-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            codigo,
            nuevaPassword
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje ||
          "No se pudo cambiar la contraseña."
        );
      }

      setMensaje(
        "Contraseña cambiada correctamente. Ya podés iniciar sesión."
      );

      setCodigo("");
      setNuevaPassword("");
      setConfirmarPassword("");

    } catch (error) {

      console.error(
        "Error al cambiar contraseña:",
        error
      );

      setError(error.message);

    } finally {

      setCargando(false);
    }
  };


  return (
    <div>

      <nav className="navbar">

        <Link to="/">Inicio</Link>

        <Link to="/Registro">
          Registrarse
        </Link>

        <Link to="/login">
          Iniciar sesión
        </Link>

        <Link to="/Contacto">
          Contacto
        </Link>

        <Link to="/Reservar_turno">
          Reservar turno
        </Link>

      </nav>


      <div className="formRegistro">

        <h1>
          Recuperar contraseña
        </h1>


        {!codigoEnviado ? (

          <form onSubmit={solicitarCodigo}>

            <label>
              Ingresá tu correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="correo@ejemplo.com"
            />

            {error && (
              <p className="mensaje-error">
                {error}
              </p>
            )}

            {mensaje && (
              <p className="mensaje-exito">
                {mensaje}
              </p>
            )}

            <button
              type="submit"
              disabled={cargando}
            >
              {cargando
                ? "Enviando..."
                : "Enviar código"
              }
            </button>

          </form>

        ) : (

          <form onSubmit={cambiarPassword}>

            <p>
              Código enviado al correo:
            </p>

            <strong>
              {email}
            </strong>


            <label>
              Código de verificación
            </label>

            <input
              type="text"
              value={codigo}
              onChange={(e) =>
                setCodigo(e.target.value)
              }
              placeholder="Ingresá el código"
            />


            <label>
              Nueva contraseña
            </label>

            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) =>
                setNuevaPassword(e.target.value)
              }
              placeholder="Nueva contraseña"
            />


            <label>
              Confirmar nueva contraseña
            </label>

            <input
              type="password"
              value={confirmarPassword}
              onChange={(e) =>
                setConfirmarPassword(
                  e.target.value
                )
              }
              placeholder="Repetí la contraseña"
            />


            {error && (
              <p className="mensaje-error">
                {error}
              </p>
            )}

            {mensaje && (
              <p className="mensaje-exito">
                {mensaje}
              </p>
            )}


            <button
              type="submit"
              disabled={cargando}
            >
              {cargando
                ? "Cambiando contraseña..."
                : "Cambiar contraseña"
              }
            </button>

          </form>

        )}

      </div>

    </div>
  );
}

export default Recuperar_password;