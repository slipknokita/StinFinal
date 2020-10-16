let submitRegister = document.getElementById("form");
let expresionUser = /\w/;
let expresionMail = /\w+@\w+\.+[a-z]/;
let users = [];

submitRegister.addEventListener("submit", e => {
    e.preventDefault();
    let newUser = document.getElementById("newUser").value;
    let newPass = document.getElementById("newPass").value;
    let newPassV = document.getElementById("newPassV").value;
    let newEmail = document.getElementById("newEmail").value;
    let newEmailV = document.getElementById("newEmailV").value;
    let contry = document.getElementById("contry").value;
    let user = {
        "userName": newUser,
        "password": newPass,
        "email": newEmail,
        "pais": contry
    };
    if (4 < newUser.length > 16){
        alert("El nombre de usuario tiene que tener un minimo de 4 caracteres y un maximo de 8(a-z, A-Z, 0-9).");
        return false;
    } else if (!expresionUser.test(newUser)){
        alert("El nombre de usuario no puede tener caracteres especiales.");
        return false;
    }else if (8 < newPass.length > 16 ){
        alert("Su contraseña no es valida, tiene que tener un minimo de 8 caracteres y un maximo de 16.");
        return false;
    } else if (newPass != newPassV){
        alert("Sus contraseña no coinciden.");
        return false;
    } else if (!expresionMail.test(newEmail)){
        alert("El formato de su email no es valido.")
        return false;
    } else if (newEmail != newEmailV){
        alert("Sus email no coinciden.");
        return false;
    } else if (contry === ""){
        alert("Complete su país de residencia.");
        return false;
    } else {
        users.push(user);
        console.log(users);
        saveLS();
        window.location.replace("/login.html")
    }
    function saveLS(){
        localStorage.setItem("users", JSON.stringify(users));
    }
});
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