let botonForm = document.querySelector("#botonContacto");

botonForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    let nombre = document.querySelector("#nombre").value;
    let email = document.querySelector("#email").value;
    let mensaje = document.querySelector("#mensaje").value;

    if (nombre === "" || email === "" || mensaje === "") {
        alert("Por favor ingrese todos los datos")
    } else {
        
    }

    console.log(`nombre: ${nombre} Email: ${email} Mensaje: ${mensaje}`);
})