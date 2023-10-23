const usersArray = [
    {
      fullname: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      id: '1',
      active: true,
      password: 'password123',
      bornDate: 725846400000,
      location: 'New York, NY',
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
      location: 'Los Angeles, CA',
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
      location: 'Miami, FL',
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
      location: 'Chicago, IL',
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
      location: 'Houston, TX',
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
      location: 'San Francisco, CA',
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
  const userExist = usersArray.find((user) => {
    if(user.email === el.email.value) {
      return true
    }
  })

  if(userExist) {
    alert(`El correo ya se encuentra registrado`)
    return
  } 


  const usuarioNuevo = {
    fullname: el.nombreCompleto.value,
    age: el.age.valueAsNumber, //Obtengo el valor numérico
    email: el.email.value,
    password: el.contrasena.value,
    active: el.active.checked,
    bornDate: new Date(el.bornDate.value).getTime(),
    location: el.location.value,

    id: crypto.randomUUID(),

    image: el.image.value
  } 

  usersArray.push(usuarioNuevo)

  pintarUsuarios(usersArray)

})


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

  console.log(userEdit)


  // Rellenar el formulario con los datos del usuario a editar
  // Cambiar el nombre del botón a editar usuario
  // Deshabilitar los input de contraseña 

}





const objeto = {
  nombre: "Pepito",
  apellido: "Perez",
  saludar() {
    console.log(`Hola mi nombre es Pepito`)
  }
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