# Barbería Luck

Sistema web para la gestión de turnos de una barbería.

El sistema permite a los clientes registrarse, iniciar sesión, reservar turnos,
consultar sus turnos y cancelarlos.

También cuenta con un área administrativa para gestionar los turnos.

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- JWT
- bcrypt
- Nodemailer

### Base de datos

- MySQL

---

## Funcionalidades

### Clientes

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Reserva de turnos.
- Selección de servicio.
- Selección de profesional.
- Selección de fecha y horario.
- Control de horarios ocupados.
- Consulta de mis turnos.
- Cancelación de turnos.
- Recuperación de contraseña mediante código enviado por correo electrónico.

### Administrador

- Acceso protegido mediante rol.
- Visualización de turnos.
- Confirmación de turnos.
- Cancelación de turnos.
- Consulta de cliente, profesional y servicio asociado.

---

## Estructura principal

```text
Barbería Luck/
│
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   └── index.js
│
├── Proyecto_react/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── ...
│
├── database/
│   └── barberia_luck.sql
│
├── .env.example
├── .gitignore
└── README.md

Seguridad

Las credenciales de la base de datos, JWT y correo electrónico
se almacenan mediante variables de entorno.

El archivo .env no debe subirse al repositorio.

El proyecto incluye .env.example como referencia para configurar
las variables necesarias.

Roles

El sistema contempla dos tipos de usuario:

Cliente

Puede:

Registrarse.
Iniciar sesión.
Reservar turnos.
Consultar sus turnos.
Cancelar sus turnos.
Recuperar su contraseña.
Administrador

Además de las funciones correspondientes al usuario autenticado,
puede acceder al área administrativa y gestionar los turnos.

Recuperación de contraseña

El sistema utiliza Nodemailer para enviar un código de recuperación
al correo electrónico registrado.

El código tiene una validez limitada y solo puede utilizarse una vez.

Estado del proyecto

Proyecto funcional de gestión de turnos para una barbería.

Se realizaron pruebas de:

Registro.
Inicio de sesión.
Autenticación.
Reserva de turnos.
Control de disponibilidad.
Consulta de turnos.
Cancelación de turnos.
Confirmación administrativa.
Cancelación administrativa.
Recuperación de contraseña.
Envío de códigos mediante correo electrónico.