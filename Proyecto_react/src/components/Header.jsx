import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="container header-container">

                <Link to="/" className="logo">
                    <img
                        src="/logo_barberia_luck.png"
                        alt="Barbería Luck"
                        className="logo-image"
                    />
                </Link>

                <nav className="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/Reservar_turno">Reservar</Link>
                    <Link to="/Contacto">Contacto</Link>
                    <Link to="/Administracion">Administración</Link>
                </nav>

                <div className="header-actions">
                    <Link to="/login" className="btn-login">
                        Iniciar sesión
                    </Link>
                </div>

            </div>
        </header>
    );
}