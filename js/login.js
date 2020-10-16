let form = document.getElementById("form");
let body = document.getElementById("body");
let users = JSON.parse(localStorage.getItem("users"));

form.addEventListener("submit", login =>{
    login.preventDefault();
    let userLogin = document.getElementById("userName").value;
    let userPass = document.getElementById("userPass").value;
    function verification (){
        for (i= 0; i < users.length; i++){
            if (userLogin == users[i].userName && userPass == users[i].password){
                localStorage.setItem("userActive", userLogin)
                redirec();
            }
        }
    }
    verification();
    if (verification() != true){
        let error = document.createElement("p");
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
                <h1 class="text-center">Bienvenido</h1>
                <p class="text-center">Seras redireccionado en instantes a la página principal</p>
            </div>
        </body>
        </html>
    `
}
