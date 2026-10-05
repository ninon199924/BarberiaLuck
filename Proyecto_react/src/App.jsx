import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Registro from "./pages/Registro.jsx";
import Reservar_turno from "./pages/Reservar_turno.jsx";
import Recuperar_password from "./pages/Recuperar_password.jsx";
import Formulario_general from "./pages/Formulario_general.jsx";
import Administracion from "./pages/Administracion.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MisTurnos from "./pages/MisTurnos.jsx";



function App() {
  const [turnos, setTurnos] = useState([]);




  return (
    <BrowserRouter>
      <div>
        <div>
          <Navbar />
        </div>


        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Administracion" element={<Administracion turnos={turnos} setTurnos={setTurnos} />} />
          <Route path="/Formulario_general" element={<Formulario_general />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Recuperar_password" element={<Recuperar_password />} />
          <Route
            path="/Reservar_turno"
            element={
              <ProtectedRoute>
                <Reservar_turno />
              </ProtectedRoute>
            }/>
            <Route
            path="/MisTurnos"
            element={
              <ProtectedRoute>
                <MisTurnos />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div >
    </BrowserRouter>

  )
}

export default App;
