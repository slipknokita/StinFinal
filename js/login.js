let form = document.getElementById("form");
let body = document.getElementById("body");
let users = JSON.parse(localStorage.getItem("users"));

form.addEventListener("submit", login =>{
    login.preventDefault();
    let userLogin = document.getElementById("userName").value;
    let userPass = document.getElementById("userPass").value;
    function verification (){
        if (users != null){
            for (i= 0; i < users.length; i++){
            if (userLogin == users[i].userName && userPass == users[i].password){
                    localStorage.setItem("userActive", userLogin)
                    redirec();
                }
            }
        }
    }
    verification();
    if (verification() != true){
        let error = document.createElement("p");
        error.classList.add("text-danger");
        error.innerText = "Nombre de usuario y/o contraseña erroneo.";
        document.getElementById("error").appendChild(error);
        setTimeout(errorMs, 2000);
        function errorMs(){
            document.getElementById("error").removeChild(error);
        } 
    }
});
function redirec(){
    body.innerHTML = `
        <html>
        <head>
            <meta http-equiv="Refresh" content="3;url=home.html">
        </head>
        <body class="azulOscuro d-flex justify-content-center">
        <div class="container" style="margin-top: 20%;">
            <main>
                <h1 class="text-center">Bienvenido</h1>
                <p class="text-center">Seras redireccionado en instantes a la página principal</p>
                </main>
            </div>
        </body>
        </html>
        `
}
let loginActive = document.getElementById("responsiveUser");
function loginOn (){
    if (localStorage.getItem("userActive") == "admin"){
        loginActive.innerHTML=`
            <a class="nav-link dropdown-toggle active text-right" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bienvenido ${localStorage.getItem("userActive")}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="admin.html">Panel de Administracion</a>
              <button class="dropdown-item" onclick="removeLS()">Salir</button>
            </div>
            `
    } else if (localStorage.getItem("userActive") != null){
        loginActive.innerHTML=`
          <a class="nav-link dropdown-toggle active text-right" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Bienvenido ${localStorage.getItem("userActive")}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <button class="dropdown-item" onclick="removeLS()">Salir</button>
          </div>
          `
      }
}
loginOn();
function removeLS(){
  localStorage.removeItem("userActive");
  location.reload();
}