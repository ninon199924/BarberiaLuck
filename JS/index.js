
// console.log("Hola");

// let nombre = "Nino";

// console.log(nombre);

// console.log("Hola "+nombre);

// let numero1 = 1500;
// let numero2 = 1200;

// let total = numero1+numero2;

// console.log(total);

// let nombres = ["Nino", "Mauro", "Pedro"];

// nombres.push("José");
// console.log(nombres);
// nombres.unshift("Juan");
// console.log(nombres);

// nombres.splice(2,0, "Héctor");
// console.log(nombres);

// function saludar() {
//     console.log("Hola");
// }

// saludar();

// function saludar(nombre) {
//     console.log("Hola "+ nombre);
// }

// saludar("Nino");

// function turnos (fecha, hora, nombre) {
//     return ("Hola " + nombre + " tenés un turno en el día " + fecha + " a las " + hora)
// }

// let mensaje = turnos("16/04" , "15:00", "Mauro");

// console.log(mensaje);

// //Ejercicio 1
// function Cuadrado(numero){
//     console.log(numero*numero);
// }

// Cuadrado(5);

// //Ejercicio 2

// function MontoTotal(precio, cantidad){
//     console.log("El precio es de " + precio + " y la cantidad es de " + cantidad + " unidades")
//     console.log("El total es de " + (precio * cantidad));

// }

// MontoTotal(1000, 5);

// //Ejercicio 3

// function TextoNumero(nombre_producto, precio) {
//     console.log("Producto: "+ nombre_producto + " - Precio: " + precio);


// }

// TextoNumero("Ojotas", 5000)

// //Práctica JS

// //Ejercicio 1: Presentación

// let nom = "Nino";
// let edad = 27;
// let ciudad = "Mendoza";

// console.log("Hola, soy " + nom + " tengo " + edad + " años" + " y vivo en " + ciudad);

// //Ejercicio 2: Operaciones



// function suma(num1, num2){
//     console.log("La suma de los números es: " + (num1+num2));
// }

// function resta(num1, num2){
//     console.log("La resta de los números es: " + (num1-num2));
    
// }

// function multiplicacion(num1, num2){
//     console.log("La multiplicación de los números es " + (num1*num2));
// }

// let num1 = 10;
// let num2 = 5;

// suma(num1, num2);
// resta(num1, num2);
// multiplicacion(num1, num2);

// //Ejercicio 3: Lista de productos;

// let carrito = [];

// carrito.push("Zapatillas");
// carrito.push("Remera");
// carrito.push("Gorra");

// console.log(carrito);

// //Ejercicio 4: Modificar array

//  let carro = ["Zapatillas", "Remera"];

// carro.push("Ojotas");
// carro.unshift("Gorra");
// carro.splice(1,0, "Collar");

// console.log(carro);

// //Ejercicio 5: Mini carrito

// let mini_carrito = [];

// function agregarProducto(nombre, precio) {
//     mini_carrito.push(nombre, precio);
    
// }

// agregarProducto("Zapatillas", 100);

// console.log(mini_carrito);

// let productos = ["Manzanas", "Peras", "Zanahorias"];

// productos.forEach(prod =>{
//     console.log(prod);
// })

//Ejercicio 1

// let numero = 5;

// if (numero > 5) {
//     console.log("El número es mayor a 5");
// } else {
//     console.log("El número es menor o igual a 5");
// }
// //Ejercicio 2

// let nombre = "";

// if (nombre === ""){
//     console.log("Falta el nombre")
// }else{
//     console.log("Nombre correcto")
// }

// //Ejercicio 3

// let carrito = ["Medias", "Zapatillas"];

// if (carrito.length === 0) {
//     console.log("Carrito vacío");
// } else {
//     console.log("Hay productos");   
// }

//Ejercicio 4

let total = 1000;

if (total > 2000) {
    console.log("Descuento 20%");
} else if(total > 1000) {
    console.log("Descuento 10%"); 
}else{
    console.log("Sin descuento");
}

//Ejercicio 5

let mes = "Enero";

if (mes === "Enero" || mes === "Febrero" || mes === "Marzo") {
    console.log("Primer trimestre");
} else if (mes === "Abril" || mes === "Mayo" || mes === "Junio"){
    console.log("Segundo trimestre");
}else if (mes === "Julio" || mes === "Agosto" || mes === "Septiembre"){
    console.log("Tercer trimestre");
}else if (mes === "Octubre" || mes === "Noviembre" || mes === "Diciembre"){
    console.log("Cuarto trimestre");
}else{
    console.log("Ingrese un mes válido")
}

let opcion = 3;

switch (opcion) {
    case 1:
        console.log("Opcion 1")
        break;
    case 2:
        console.log("Opcion 2")
        break;
    case 3:
        console.log("Opcion 3")
        break;
    default:
        console.log("No ha seleccionado una opción válida")
        break;
}

switch (mes) {
    case "Enero":
        console.log("Primer trimestre")
        break;
    case "Febrero":
        console.log("Primer trimestre")
        break;
    case "Marzo":
        console.log("Primer trimestre")
        break;
    case "Abril":
        console.log("Segundo trimestre")
        break;
    case "Mayo":
        console.log("Segundo trimestre")
        break;
    case "Junio":
        console.log("Segundo trimestre")
        break;
    case "Julio":
        console.log("Tercer trimestre")
        break;
    case "Agosto":
        console.log("Tercer trimestre")
        break;
    case "Septiembre":
        console.log("Tercer trimestre")
        break;
    case "Octubre":
        break;
    case "Noviembre":
        console.log("Cuarto trimestre")
        break;
    case "Diciembre":
        console.log("Cuarto trimestre")
        break;
    default:
        console.log("Por favor ingrese un mes válido")
        break;
}


