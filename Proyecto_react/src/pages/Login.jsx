import { useState } from "react";
import "./Login.css";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const iniciarSesion = async (e) => {
        e.preventDefault();

        try {

            const respuesta = await fetch('https://barberialuck.onrender.com/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFormulario)
            })

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.mensaje);
                return;
            }

            // Guardamos los datos del usuario
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));

            alert(`¡Bienvenido ${datos.usuario.nombre}!`);

            // Redirigir al Home
            login(datos.usuario, datos.token);

            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor.");
        }
    };

    return (

        <div className="login-container">

            <form
                className="login-card"
                onSubmit={iniciarSesion}
            >

                <h1>💈 Barbería Luck</h1>

                <h2>Iniciar sesión</h2>

                <label>Correo electrónico</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Contraseña</label>

                <div className="password-box">

                    <input
                        type={mostrarPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        👁
                    </button>

                </div>

                <button
                    className="btn-login"
                    type="submit"
                >
                    Iniciar sesión
                </button>

                <Link
                    to="/Recuperar_password"
                    className="forgot-password"
                >
                    ¿Olvidaste tu contraseña?
                </Link>

            </form>

        </div>

    );

}