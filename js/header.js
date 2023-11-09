// Este archivo header lo vamos a utilizar cross todo el site
/*
    TODO LIST
    Si tenemos user logueado
        // * Evaluar su role y ver si pintamos en el nav el botón de admin product y admin user
        * userInfo: 
            - Pintar el nombre del user
            - Pintar el botón logout
    
    No tenemos user logueado:
        * No pintamos los botones admin
        * No colocamos le name
        * Pintamos le botón login
*/
//Tenemos que obtener el nav y el user info
const headerNav = document.getElementById('header-nav');
const userInfoHeader = document.getElementById('header-user');

// #Hay que evaluar si tenemos un usuario logueado
const loguedUser = JSON.parse(localStorage.getItem("currentUser"))

if(loguedUser) {
    //Tengo un usuario logueado<a href="/pages/admin/user-admin.html" class="header-link">User admin</a>
    //-CHECKEAR SI EL USUARIO ES ADMIN
    if(loguedUser.role === 'ADMIN_ROLE') {
        //Pintar los botones de admin
        const adminUserLink = document.createElement("a") //<a></a>
        adminUserLink.href = '/pages/admin/user-admin.html'
        adminUserLink.innerText = 'User admin'
        adminUserLink.classList.add('header-link', 'otra-clase');
        headerNav.appendChild(adminUserLink)

        const productAdminLink = document.createElement("a") //<a></a>
        productAdminLink.href = '/pages/admin/product-admin.html'
        productAdminLink.innerText = 'Product admin'
        productAdminLink.classList.add('header-link');
        headerNav.appendChild(productAdminLink)

    }

    const userNameHTML = userInfoHeader.querySelector('.user-name')

    userNameHTML.innerText = loguedUser.fullname

    const userImg = document.createElement('img')
    userImg.src = loguedUser.image;
    userImg.alt = `${loguedUser.fullname} profile picture`
    userImg.classList.add('user-profile-picure')

    userInfoHeader.appendChild(userImg)

    // -LOGOUT ACTION BUTTON
    const userActionHTML = userInfoHeader.querySelector('.user-action')

    const logoutButton = document.createElement('button');
    logoutButton.classList.add('header-link')
    logoutButton.innerText = 'Logout'

    logoutButton.onclick = function() {

        localStorage.removeItem("currentUser");
        window.location.href = '/index.html'

    }

    userActionHTML.append(logoutButton)

} else {
    //No tengo un user logueado
    const userActionHTML = userInfoHeader.querySelector('.user-action')

    const loginLink = document.createElement("a")
    loginLink.href = '/pages/login/login.html';
    loginLink.innerText = "Ingresar";
    loginLink.classList.add('header-link')

    userActionHTML.appendChild(loginLink)
}