import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";

const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};




function Registro() {


  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: ""
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [emailDisponible, setEmailDisponible] = useState(null);
  const [verificandoEmail, setVerificandoEmail] = useState(false);

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

    if (e.target.name === "email") {
      setEmailDisponible(null);
    }
  };

  const verificarEmail = async () => {

    if (!validarEmail(formulario.email)) {
      setEmailDisponible(null);
      return;
    }

    setVerificandoEmail(true);

    try {

      const respuesta = await fetch(
        `http://localhost:3000/usuarios/verificar-email/${encodeURIComponent(formulario.email)}`
      );

      const datos = await respuesta.json();

      setEmailDisponible(!datos.existe);

    } catch (error) {

      setEmailDisponible(null);

    }

    setVerificandoEmail(false);
  };

  const formularioValido =
    formulario.nombre &&
    formulario.apellido &&
    validarEmail(formulario.email) &&
    formulario.telefono &&
    formulario.password.length >= 8 &&
    formulario.password === formulario.confirmarPassword &&
    emailDisponible === true;


  const registrar = async (e) => {

    e.preventDefault();

    setError("");
    setMensaje("");

    if (
      !formulario.nombre ||
      !formulario.apellido ||
      !formulario.email ||
      !formulario.telefono ||
      !formulario.password
    ) {

      setError("Todos los campos son obligatorios.");

      return;

    }

    if (formulario.password.length < 8) {

      setError("La contraseña debe tener al menos 8 caracteres.");

      return;

    }

    if (formulario.password !== formulario.confirmarPassword) {

      setError("Las contraseñas no coinciden.");

      return;

    }

    setCargando(true);

    try {

      const respuesta = await fetch(
        "http://localhost:3000/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre: formulario.nombre,
            apellido: formulario.apellido,
            email: formulario.email,
            telefono: formulario.telefono,
            password: formulario.password
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {

        setError(datos.mensaje);

        setCargando(false);

        return;

      }

      setMensaje("¡Cuenta creada correctamente!");

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (error) {

      setError("No se pudo conectar con el servidor.");

    }

    setCargando(false);

  };

  const fortalezaPassword = () => {

    const pass = formulario.password;

    if (pass.length < 6) return "Débil";

    if (
      pass.length >= 8 &&
      /[A-Z]/.test(pass) &&
      /\d/.test(pass)
    ) {
      return "Fuerte";
    }

    return "Media";

    <div className="barra-password">
      <div className={`nivel ${fortalezaPassword().toLowerCase()}`}></div>
    </div>
  };


  return (

    <div className="registro-container">

      <form
        className="registro-form"
        onSubmit={registrar}
      >

        <h2>Crear cuenta</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {mensaje && (
          <div className="exito">
            {mensaje}
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
        />
        {formulario.nombre && formulario.nombre.length < 2 && (
          <small className="error-text">
            El nombre debe tener al menos 2 caracteres.
          </small>
        )}

        <input
          type="text"
          placeholder="Apellido"
          name="apellido"
          value={formulario.apellido}
          onChange={manejarCambio}
        />

        {formulario.apellido && formulario.apellido.length < 2 && (
          <small className="error-text">
            El apellido debe tener al menos 2 caracteres.
          </small>
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={formulario.email}
          onChange={manejarCambio}
          onBlur={verificarEmail}
        />

        {verificandoEmail && (
          <small className="info-text">
            Verificando correo...
          </small>
        )}

        {emailDisponible === true && (
          <small className="success-text">
            ✓ Correo disponible
          </small>
        )}

        {emailDisponible === false && (
          <small className="error-text">
            Ya existe una cuenta con ese correo.
          </small>
        )}

        {formulario.email && !validarEmail(formulario.email) && (
          <small className="error-text">
            Ingresá un correo electrónico válido.
          </small>
        )}

        <input
          type="tel"
          placeholder="Teléfono"
          name="telefono"
          value={formulario.telefono}
          onChange={manejarCambio}
        />
        {formulario.telefono &&
          !/^[0-9]{8,15}$/.test(formulario.telefono) && (
            <small className="error-text">
              Ingresá un teléfono válido (solo números).
            </small>
          )}
        <div className="password-group">

          <input
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            name="password"
            value={formulario.password}
            onChange={manejarCambio}

          />

          {formulario.password && (
            <div className={`fortaleza ${fortalezaPassword().toLowerCase()}`}>
              Seguridad: {fortalezaPassword()}
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              setMostrarPassword(!mostrarPassword)
            }
          >
            👁
          </button>

        </div>

        <div className="password-group">

          <input
            type={mostrarConfirmacion ? "text" : "password"}
            placeholder="Confirmar contraseña"
            name="confirmarPassword"
            value={formulario.confirmarPassword}
            onChange={manejarCambio}
          />

          {formulario.confirmarPassword &&
            formulario.password !== formulario.confirmarPassword && (
              <small className="error-text">
                Las contraseñas no coinciden.
              </small>
            )}

          <button
            type="button"
            onClick={() =>
              setMostrarConfirmacion(!mostrarConfirmacion)
            }
          >
            👁
          </button>

        </div>

        <button
          className="btn-registrar"
          disabled={!formularioValido || cargando}
        >
          {cargando ? "Registrando..." : "Crear cuenta"}
        </button>

        <p>

          ¿Ya tenés cuenta?

          <Link to="/login">

            Iniciar sesión

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Registro;