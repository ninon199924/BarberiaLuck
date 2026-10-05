-- =====================================================
-- BASE DE DATOS: BARBERÍA LUCK
-- =====================================================

CREATE DATABASE IF NOT EXISTS turno_barberia
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE turno_barberia;


-- =====================================================
-- TABLA: usuarios
-- =====================================================

CREATE TABLE usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_registro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_usuario),
    UNIQUE KEY email (email)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA: servicios
-- =====================================================

CREATE TABLE servicios (
    id_servicio INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion INT NOT NULL COMMENT 'Duración en minutos',
    activo TINYINT(1) DEFAULT 1,

    PRIMARY KEY (id_servicio)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA: profesionales
-- =====================================================

CREATE TABLE profesionales (
    id_profesional INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) DEFAULT NULL,
    especialidad VARCHAR(100) DEFAULT NULL,
    activo TINYINT(1) DEFAULT 1,

    PRIMARY KEY (id_profesional)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA: turnos
-- =====================================================

CREATE TABLE turnos (
    id_turno INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_profesional INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM(
        'pendiente',
        'confirmado',
        'cancelado',
        'finalizado'
    ) DEFAULT 'pendiente',
    observaciones TEXT,
    fecha_creacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_turno),

    KEY id_usuario (id_usuario),
    KEY id_profesional (id_profesional),
    KEY id_servicio (id_servicio),

    CONSTRAINT turnos_ibfk_1
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id_usuario),

    CONSTRAINT turnos_ibfk_2
        FOREIGN KEY (id_profesional)
        REFERENCES profesionales (id_profesional),

    CONSTRAINT turnos_ibfk_3
        FOREIGN KEY (id_servicio)
        REFERENCES servicios (id_servicio)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA: recuperacion_password
-- =====================================================

CREATE TABLE recuperacion_password (
    id_recuperacion INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    fecha_expiracion DATETIME NOT NULL,
    usado TINYINT(1) DEFAULT 0,

    PRIMARY KEY (id_recuperacion),

    KEY id_usuario (id_usuario),

    CONSTRAINT recuperacion_password_ibfk_1
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id_usuario)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- DATOS INICIALES: SERVICIOS
-- =====================================================

INSERT INTO servicios
(nombre, descripcion, precio, duracion, activo)
VALUES
(
    'Corte',
    'Corte de cabello tradicional',
    5000.00,
    30,
    1
),
(
    'Barba',
    'Perfilado y arreglo de barba',
    3500.00,
    20,
    1
),
(
    'Corte + Barba',
    'Corte de cabello más arreglo de barba',
    7500.00,
    50,
    1
),
(
    'Perfilado',
    'Perfilado de cabello y barba',
    3000.00,
    20,
    1
);


-- =====================================================
-- DATOS INICIALES: PROFESIONAL
-- =====================================================

INSERT INTO profesionales
(nombre, apellido, especialidad, activo)
VALUES
(
    'Juan',
    'Pérez',
    'Barbero',
    1
);


-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================