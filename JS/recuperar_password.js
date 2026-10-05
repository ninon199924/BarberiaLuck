let botonRecuperar = document.querySelector("#botonRecuperar");

botonRecuperar.addEventListener("submit", (e) =>{
    e.preventDefault();

    let email = document.querySelector("#email").value;
    let newPass = document.querySelector("#newPass").value;
    let confPass = document.querySelector("#confPass").value;
    let codVer = document.querySelector("#codVer").value;

    console.log(`Email: ${email} Nueva Contraseña: ${newPass} Confirmar Contraseña: ${confPass} Código de Verificación: ${codVer}`);

})