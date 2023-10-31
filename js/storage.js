// Guardar datos uso una key y el valor

const user =  [ 1, 2,3,4,5 ]

//! localStorage.setItem("usuario",  JSON.stringify(user)   )


// Obtener datos del localStorage 

const resultado =  JSON.parse(  localStorage.getItem("usuario")    )  

console.log(resultado)


// Borrar un dato guardado
//// localStorage.removeItem("usuario")


// Borrar todo el localStorage
// localStorage.clear()