import { Link } from "react-router-dom";
import "../App.css"

function Formulario_general() {
  return (
    <div>
      <nav className="navbar">
      <Link to="/Registro">Registrarse</Link>
      <Link to="/Recuperar_password">¿Olvidaste tu contraseña?</Link>
      <Link to="/Contacto">Contacto</Link>
      </nav>
      <form className="formPaginaPrincipal">

        <label>Usuario:</label>
        <input className="input" type="text" />

        <label>Contraseña</label>
        <input className="input" type="password" />

        <button className="IniciarSesion">Iniciar Sesión</button>

      </form>
    </div>

  );
}
export default Formulario_general;