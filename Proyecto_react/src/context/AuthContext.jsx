import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {

        const usuarioGuardado = localStorage.getItem("usuario");

        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }

    }, []);

    const login = (usuario, token) => {

        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", token);

        setUsuario(usuario);

    };

    const logout = () => {

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        setUsuario(null);

    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}