/* 
    //Cargar usuarios de la DB (localstorage)
    //Tomar el formulario
    //Tomar los datos cargados

    ❔Ver si existe un email como el que el usuario ingreso
    ❔Corroborar que exista la contraseña
    //    ❌ Cuando no exista el email
        ❌ Existe el email pero la contraseña no coincide
            Mensaje de error

        ✅ Hacer login
            - guardar en el localstorage un currentUser
            - redireccionar al home
*/
const users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const email = loginForm.elements.email.value;
    const password = evt.target.elements.password.value;

    const user = users.find((usr) => {

        if(usr.email.toLowerCase() === email.toLowerCase()) {
            return true
        }

        return false
        //return usr.email === email
    })

    // Cortamos el submit ya que no existe el correo
    if(!user || user.password !== password) {
        Swal.fire({
            icon: 'error',
            title: 'Login Incorrecto',
            text: 'Alguno de los datos ingresados no es correcto',
            timer: 2000
        })
        return;
    }

    delete user.password;
    
    localStorage.setItem("currentUser", JSON.stringify(user))

    Swal.fire({
        icon: 'success',
        title: 'Login Correcto!',
        text: 'Será redireccionado en un momento'
    })

    console.log('Iniciando timeout')

    setTimeout(function(){

        window.location.href = '/index.html'
    }, 
    2500)

})
