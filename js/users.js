const usersArray = [
    {
      fullname: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      id: '1',
      active: true,
      password: 'password123',
      bornDate: 725846400000,
      location: 'La Luna',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280'
    },
    {
      fullname: 'Jane Doe',
      age: 25,
      email: 'jane.doe@example.com',
      id: '2',
      active: false,
      password: 'password456',
      bornDate: new Date('1998-05-05').getTime(),
      location: 'Mendoza',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280'
    },
    {
      fullname: 'Alice Johnson',
      age: 35,
      email: 'alice.johnson@example.com',
      id: '3',
      active: true,
      password: 'password789',
      bornDate: new Date('1988-08-08').getTime(),
      location: 'Mendoza',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
    },
    {
      fullname: 'Michael Smith',
      age: 40,
      email: 'michael.smith@example.com',
      id: '4',
      active: false,
      password: 'password101',
      bornDate: new Date('1983-04-10').getTime(),
      location: 'San Luis',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
    },
    {
      fullname: 'Emily Johnson',
      age: 28,
      email: 'emily.johnson@example.com',
      id: '5',
      active: true,
      password: 'password202',
      bornDate: new Date('1995-02-15').getTime(),
      location: 'Córdoba',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
    },
    {
      fullname: 'Daniel Lee',
      age: 34,
      email: 'daniel.lee@example.com',
      id: '6',
      active: false,
      password: 'password303',
      bornDate: new Date('1989-07-07').getTime(),
      location: 'Buenos Aires',
      image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
    },
    // {
    //   fullname: 'Samantha Davis',
    //   age: 22,
    //   email: 'samantha.davis@example.com',
    //   id: '7',
    //   active: true,
    //   password: 'password404',
    //   bornDate: new Date('2001-11-11').getTime(),
    //   location: 'Boston, MA',
    //   image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/2/2d/Mk8icondk.png?width=325'
    // },
    // {
    //   fullname: 'James Moore',
    //   age: 45,
    //   email: 'james.moore@example.com',
    //   id: '8',
    //   active: false,
    //   password: 'password505',
    //   bornDate: new Date('1978-12-19').getTime(),
    //   location: 'Dallas, TX',
    //   image: "https://m.media-amazon.com/images/I/81wNRtDaTXL.png"
    // },
    // {
    //   fullname: 'Isabella Taylor',
    //   age: 29,
    //   email: 'isabella.taylor@example.com',
    //   id: '9',
    //   active: true,
    //   password: 'password606',
    //   bornDate: new Date('1994-06-24').getTime(),
    //   location: 'San Diego, CA',
    //   image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/3/3a/Mk8iconkoopa.png?width=325'
    // },
    // {
    //   fullname: 'Ethan Johnson',
    //   age: 31,
    //   email: 'ethan.johnson@example.com',
    //   id: '10',
    //   active: false,
    //   password: 'password707',
    //   bornDate: new Date('1992-03-03').getTime(),
    //   location: 'Denver, CO',
    //   image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/b7/Mk8iconbowser.png?width=325'
    // }
];

console.log(usersArray)

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
  if(el.password.value !== el.password2.value ) {
    alert(`Las contraseñas no coiciden`)
    return;
  }

  // !Email ya existe
  // const emailExist = usersArray.find((user) => {
  //   if(user.email === el.email.value) {
  //     return true
  //   }
  // })

  // if(emailExist) {
  //   alert(`El correo ya se encuentra registrado`)
  //   return
  // }

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
    image: el.image.value
  } 

  // Tenemos 2 posibles acciones a realizar
  //  a- Al estar editando debería reemplazar el usuario a editar con sus información actualizada
  //  b- Agregue un usuario nuevo

  // Pregunto si tengo id para saber si estoy editando o no
  if(el.id.value) {
    // -Editando
    const indice = usersArray.findIndex(usuario => {

      if(usuario.id === el.id.value) {
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
searchInput.addEventListener('keyup', (eventito)=> {

  // Obtener el valor del input y lo pasamos a minúsculas
  const inputValue = eventito.target.value.toLowerCase();
  // Buscar en todos los usuarios aquellos donde su nombre tengan este texto

  // const usuariosFiltrados = usersArray.filter((usuario) => usuario.fullname.toLowerCase().includes(inputValue))
  const usuariosFiltrados = usersArray.filter(usuario => {

    const nombre = usuario.fullname.toLowerCase()

    if(nombre.includes(inputValue)) {
      return true
    } 
    return false

  })

  // Pintar solo los usuario que hayan coincido
  pintarUsuarios(usuariosFiltrados)
  
})





function pintarUsuarios(arrayPintar) {
  // Iterar el array y agregar un tr por cada alumno que tengamos. 
  tableBody.innerHTML = '';

  arrayPintar.forEach( (user, indiceActual) => {

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

              <button class="action-btn btn-danger" title="Borrar usuario" onclick="borrarUsuario(${indiceActual})" >
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

//Llamo por primera vez que se ejecuta mi script la función pintar usuarios
pintarUsuarios(usersArray)


function borrarUsuario(indice) {
  usersArray.splice(indice, 1)
  pintarUsuarios(usersArray)
}

// forEach, map, filter, findIndex, find, flat, flatMap, every, some




function editarUsuario(idBuscar) {
  // Buscar un usuario con id y obtenerlo
  const userEdit = usersArray.find((usuario) => {

    //deberia devolver un true, según la condición id que me enviaron === al del usuario que estoy iterando
    if(usuario.id === idBuscar) {
      return true
    }

  })

  //Indicar que el usuario no fue encontrado
  if(!userEdit) {
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






{/* 
<tr class="table-body">
    <td class="user-image">
        <img src="https://m.media-amazon.com/images/I/81wNRtDaTXL.png" alt="Imagen de prueba">
    </td>
    <td class="user-name">Sonic Heroes</td>
    <td class="user-email">sonic@gmail.com</td>
    <td class="user-location">Super Mario World</td>
    <td class="user-age">24</td>
    <td class="user-date">24/05/98</td>
</tr> */}