import request from "./api";

export function obtenerTurnos() {
    return request("/turnos");
}

export function crearTurno(datos) {

    return request("/turnos", {

        method: "POST",

        body: JSON.stringify(datos)

    });

}

export function eliminarTurno(id){

    return request(`/turnos/${id}`,{

        method:"DELETE"

    });

}