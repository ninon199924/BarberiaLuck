import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {

    const { usuario, logout } = useAuth();

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                <img
                    src="/logo_barberia_luck.png"
                    alt="Barbería Luck"
                    className="logo-image"
                />
            </Link>

            <div className="menu">

                <Link to="/">Inicio</Link>

                <Link to="/Reservar_turno">
                    Reservar turno
                </Link>

                <Link to="/Registro">
                    Registro
                </Link>

            </div>

            <div className="usuario">

                {usuario ? (
                    <>
                        <span>
                            Hola, {usuario.nombre}
                        </span>

                        <button onClick={logout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        Iniciar sesión
                    </Link>
                )}

            </div>

        </nav>
    );
}

export default Navbar;