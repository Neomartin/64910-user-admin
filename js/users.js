
const usersArray = JSON.parse(localStorage.getItem("users"))

// if(JSON.parse(localStorage.getItem("users"))) {
//   // Si es nulo no entra al if

//   usersArray = JSON.parse( localStorage.getItem()  )

// } else {
//   // -> 
//   usersArray = []
// }

// Obtener el body de la tabla
const tableBody = document.getElementById('table-body')
const searchInput = document.querySelector('#search')
const userForm = document.querySelector("form#user-form")
const submitBtn = userForm.querySelector('button[type=submit].btn-form')



// Escuchamos el evento submit en el formulario
userForm.addEventListener("submit", (evt) => {

  evt.preventDefault()

  const el = evt.target.elements;

  //Debería cortar la ejecución de la función callback del evento submit
  // !Password y password2 sean distintos
  if (el.password.value !== el.password2.value) {
    alert(`Las contraseñas no coiciden`)
    return;
  }

  // !Email ya existe
  const emailExist = usersArray.find((user) => {
    if (user.email === el.email.value) {
      return true
    }
  })

  if (emailExist && el.id.value !== emailExist.id) {
    Swal.fire({
      title: 'El correo ya existe',
      icon: 'error'
    })
    return
  }

  // # If else convencional
  // let id;
  // if(el.id.value) {
  //   id = el.id.value
  // } else {
  //   id = crypto.randomUUID()
  // }

  // # Operador ternario
  //          condicion       true        false
  const id = el.id.value ? el.id.value : crypto.randomUUID()


  const user = {
    fullname: el.nombreCompleto.value,
    age: el.age.valueAsNumber, //Obtengo el valor numérico
    email: el.email.value,
    password: el.contrasena.value,
    active: el.active.checked,
    bornDate: new Date(el.bornDate.value).getTime(),
    location: el.location.value,
    id: id,
    image: el.image.value,
    role: 'CLIENT_ROLE'
  }

  // Tenemos 2 posibles acciones a realizar
  //  a- Al estar editando debería reemplazar el usuario a editar con sus información actualizada
  //  b- Agregue un usuario nuevo

  // Pregunto si tengo id para saber si estoy editando o no
  if (el.id.value) {
    // -Editando
    const indice = usersArray.findIndex(usuario => {

      if (usuario.id === el.id.value) {
        return true
      }
    })
    //reemplazo el usuario con los datos nuevos del formulario
    usersArray[indice] = user

    Swal.fire({
      title: 'Usuario Editado',
      text: 'Los datos del usuario fueron actualizados correctamente',
      icon: 'success',
      timer: 1000
    })
    //al modificar el array necesito refrescar la vista
  } else {
    //Agregando un usuario nuevo
    usersArray.push(user)
    Swal.fire({
      title: 'Usuario Agregado',
      text: 'Usuario se creo correctamente',
      icon: 'success',
      timer: 1000
    })
  }
  pintarUsuarios(usersArray)
  // -Actualizo el localStorage
  actualizarLocalStorage()

  resetearFormulario()

})

function resetearFormulario() {

  userForm.reset() //Reseteo el formulario
  userForm.elements.password.disabled = false; //Activo si estaban desactivados los input password
  userForm.elements.password2.disabled = false;
  submitBtn.classList.remove('btn-edit') //Remuevo la clase editar
  submitBtn.innerText = 'Agregar usuario' //Vuelvo el texto del botón a su valor por defecto
  userForm.elements.nombreCompleto.focus()
}

// Filtro de usuarios
//Escuchar cuando el usuario presiona una tecla en el input search
searchInput.addEventListener('keyup', (eventito) => {

  // Obtener el valor del input y lo pasamos a minúsculas
  const inputValue = eventito.target.value.toLowerCase();
  // Buscar en todos los usuarios aquellos donde su nombre tengan este texto

  // const usuariosFiltrados = usersArray.filter((usuario) => usuario.fullname.toLowerCase().includes(inputValue))
  const usuariosFiltrados = usersArray.filter(usuario => {

    const nombre = usuario.fullname.toLowerCase()

    if (nombre.includes(inputValue)) {
      return true
    }
    return false

  })

  // Pintar solo los usuario que hayan coincido
  pintarUsuarios(usuariosFiltrados)

})

//Llamo por primera vez que se ejecuta mi script la función pintar usuarios
pintarUsuarios(usersArray)



function pintarUsuarios(arrayPintar) {
  // Iterar el array y agregar un tr por cada alumno que tengamos. 
  tableBody.innerHTML = '';

  arrayPintar.forEach((user, indiceActual) => {

    tableBody.innerHTML += `
        <tr class="table-row">
            <td class="user-image">
                <img src="${user.image}" alt="${user.fullname} avatar">
            </td>
            <td class="user-name">${user.fullname}</td>
            <td class="user-email">${user.email}</td>
            <td class="user-location">${user.location}</td>
            <td class="user-age">${user.age}</td>

            <td class="user-date">${ formatDate(user.bornDate) }</td>

            <td>

              <button class="action-btn btn-danger" title="Borrar usuario" 
                      onclick="borrarUsuario(  '${user.id}', '${user.fullname}'  )" >
                <i class="fa-solid fa-trash-can"></i>
              </button>

              <button class="action-btn" 
                      title="Editar usuario"
                      onclick="editarUsuario( '${user.id}')">

                  <i class="fa-solid fa-pen-to-square"></i>

              </button>

            </td>
        </tr>`
  })

}

function actualizarLocalStorage() {

  localStorage.setItem("users", JSON.stringify(usersArray))

}


function borrarUsuario(ID, nombre) {

  const confirmDelete = confirm(`Realmente desea borrar este usuario ${nombre}`)

  if (confirmDelete) {

    const indice = usersArray.findIndex(user => user.id === ID)

    usersArray.splice(indice, 1)
    pintarUsuarios(usersArray)

    actualizarLocalStorage()

  }

}

// forEach, map, filter, findIndex, find, flat, flatMap, every, some




function editarUsuario(idBuscar) {
  // Buscar un usuario con id y obtenerlo
  const userEdit = usersArray.find((usuario) => {

    //deberia devolver un true, según la condición id que me enviaron === al del usuario que estoy iterando
    if (usuario.id === idBuscar) {
      return true
    }

  })

  //Indicar que el usuario no fue encontrado
  if (!userEdit) {
    Swal.fire('Error al editar', 'No se pudo editar el usuario', 'error')
    return
  }

  console.log(userEdit)

  // Rellenar el formulario con los datos del usuario a editar

  const el = userForm.elements;

  el.id.value = userEdit.id;

  el.age.value = userEdit.age
  el.nombreCompleto.value = userEdit.fullname
  el.email.value = userEdit.email;
  el.image.value = userEdit.image;
  el.location.value = userEdit.location;
  el.active.checked = userEdit.active;

  el.contrasena.value = userEdit.password;
  el.contrasena.disabled = true
  el.contrasena2.value = userEdit.password;
  el.contrasena2.disabled = true
  //// fullname
  //// email
  //// image
  // # location
  //// active -> checked
  //// ❌password
  //// ❌repeat password
  //// ❌fecha
  el.bornDate.value = formatInputDate(userEdit.bornDate)

  // -Cambiar el nombre del botón a editar usuario

  submitBtn.classList.add('btn-edit');
  submitBtn.innerText = 'Editar usuario'
  // Deshabilitar los input de contraseña





}






{
  /* 
  <tr class="table-body">
      <td class="user-image">
          <img src="https://m.media-amazon.com/images/I/81wNRtDaTXL.png" alt="Imagen de prueba">
      </td>
      <td class="user-name">Sonic Heroes</td>
      <td class="user-email">sonic@gmail.com</td>
      <td class="user-location">Super Mario World</td>
      <td class="user-age">24</td>
      <td class="user-date">24/05/98</td>
  </tr> */
}