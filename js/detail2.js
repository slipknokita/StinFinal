const root = document.getElementById('detailRoot');
const id = window.location.hash.slice(1);

async function getTodoById(id) {
  const url = `http://localhost:3000/Games/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data
}

function buildTodo(game) {
  const info = document.createElement('p');
  info.innerHTML = `
<div class="">
        <div class="">
            <div class="container">
                <div class="pt-4">
                    <span><a href="/home.html">Biblioteca</a>> ${game.category} > ${game.name}</span>
                </div>
                <div class="my-3">
                    <h1>${game.name}</h1>
                </div>
                <div class="row">
                    <div class="view-smart d-block d-sm-block d-md-block d-lg-none">
                        <div class="col-xl-4 col-lg-4 col-4-md col-12-sm review">
                            <img class="img-desc mt-3" src="${game.imgSource}" alt="img-juego">
                            <h4 class="mt-3">Valoracion de usuarios</h4>
                            <p class="d-inline-block m-0">Reseñas Positivas: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingPositive">0</p></p>
                            <p class="d-inline-block m-0">Reseñas Negativas: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingNegative">0</p></p>
                            <p class="d-inline-block m-0">Reseñas Totales: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingTotal">0</p></p>
                            <p class="d-inline-block m-0">Veces marcado como favorito: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingFavorite">0</p></p>
                            <h4>Puntúa este juego!</h4>
                            <div class="container">
                                <div class="row py-3 ">
                                    <div class="d-flex justify-content-center">
                                        <div class="col-4">
                                            <button id="btn" class="btn" onclick="countPositive()"><i class="text-white far fa-thumbs-up fa-3x"></i></button>
                                        </div>
                                        <div class="col-4">
                                            <button id="btn" class="btn" onclick="countNegative()"><i class="text-white far fa-thumbs-down fa-3x"></i></button>
                                        </div>
                                        <div class="col-4">
                                            <button id="btn" class="btn" onclick="countFavorite()"><i class="text-danger fas fa-heart fa-3x"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p id="warning"></p>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-7-md col-12-sm">
                        <h2>Información del juego</h2>
                        <p>${game.text}</p>
                        <h2>Ficha técnica de la versión PS5 y PS4</h2>
                        <ul>
                            <li>Fecha de lanzamiento: 19/11/2020</li>
                            <li>Desarrollo: Insomniac Games</li>
                            <li>Producción: PlayStation Studios</li>
                            <li>Distribución: Sony</li>
                            <li>Precio: 59,99 €</li>
                            <li>Jugadores: 1</li>
                            <li>Formato: Blu-ray</li>
                            <li>Textos: Multilenguaje</li>
                            <li>Voces: Multilenguaje</li>
                            <li>Online: No confirmado</li>
                        </ul>
                    </div>
                    <div class="view-desktop d-none d-sm-none d-md-none d-lg-block col-xl-4 col-lg-4 col-4-md col-12-sm review">
                        <img id="likecard" class="img-desc mt-3" src="${game.imgSource}" alt="img-juego">
                        <h3  class="mt-3 pb-4">Valoracion de usuarios</h3>
                        <p class="d-inline-block m-0">Reseñas Positivas: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingPositive2">0</p></p>
                        <p class="d-inline-block m-0">Reseñas Negativas: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingNegative2">0</p></p>
                        <p class="d-inline-block m-0">Reseñas Totales: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingTotal2">0</p></p>
                        <p class="d-inline-block m-0">Veces marcado como favorito: &nbsp;&nbsp;<p class="d-inline-block m-0" id="countingFavorite2">0</p></p>
                        <h3>Puntúa este juego!</h3>
                        <div  class="container">
                            <div class="row py-3 ">
                                <div  class="d-flex justify-content-center">
                                    <div class="col-4">
                                        <button id="btn" class="btn"  onclick="countPositive()"><i class="text-white far fa-thumbs-up fa-3x"></i></button>
                                    </div>
                                    <div class="col-4">
                                        <button id="btn" class="btn"  onclick="countNegative()"><i class="text-white far fa-thumbs-down fa-3x"></i></button>
                                    </div>
                                    <div class="col-4">
                                        <button id="btn" class="btn"  onclick="countFavorite()"><i class="text-danger fas fa-heart fa-3x"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p id="warning"></p>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-12-md col-12-sm mt-4">
                        <h3>Trailer</h3>
                        <div class="embed-container border border-dark rounded">
                            <iframe width="560" height="315" src="https://${game.video1}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-12-md col-12-sm mt-4">
                        <h3>Gameplay</h3>
                        <div class="embed-container border border-dark rounded">
                            <iframe width="560" height="315" src="https://${game.video2}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="d-flex justify-content-center my-3">GALERIA</h2>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery1}" alt="spiderman1">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery8}" alt="spiderman2">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery2}" alt="spiderman3">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery3}" alt="spiderman4">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery4}" alt="spiderman5">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery5}" alt="spiderman6">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery6}" alt="spiderman7">
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <img class="img-galery" src="${game.galery7}" alt="spiderman8">
                    </div>
                </div>
                <div>
                <h2 class="my-5 text-center">Opiniones de los usuarios</h2>
                <div id="commentsSection" class="text-dark divComments pb-5"></div>
                </div>
        </div>
        </div>
        </div>
        <footer class="mt-0 ">
        <div class="footer ">
        <div class="footer py-3">
          <div class="container my-0">
            <div class="row text-center">
              <div class="text-center col-xl-3 col-lg-3 col-12-md col-12-sm">
                <a href="index.html"><img class="p-3" src="img/logoninja.png" alt="Logo" width="70%"></a>
              </div>
              <div class="socials col-xl-3 col-lg-3 col-12-md col-12-sm mb-3">
                <h2 class="text-white">Redes Sociales</h2>
                <a href="https://www.facebook.com"><i class="fab fa-facebook-square fa-4x mx-2 a-footer"></i></a>
                <a href="https://www.instagram.com"><i class="fab fa-instagram fa-4x a-footer"></i></a>
                <a href="https://www.twitter.com"><i class="fab fa-twitter-square fa-4x mx-2 a-footer"></i></a>
            </div>
            <div class="copyright col-xl-3 col-lg-3 col-12-md col-12-sm d-flex align-items-center justify-content-center py-2 mb-2 border-top border-bottom">
                <h5 class="text-white">Stin Gaming 2020 - Todos los Derechos Reservados</h5>
            </div>
            <div class="links col-xl-3 col-lg-3 col-12-md col-12-sm d-flex align-self-center">
                <a class="a-footer" href="aboutUs.html"><h5>Acerca de nosotros</h5></a>
                <a class="a-footer" href="https://mail.google.com/mail/?view=cm&fs=1&to=stin@gmail.com&su=Consulta&body=Escribenos en que te podemos ayudar. No hacemos reembolso"
                  target="_blank"><h5>Contacto: stin@gmail.com</h5></a>
                <a class="a-footer" href="error404.html"><h5>Legales</h5></a>
            </div>
            </div>
          </div>
        </div>
      </footer>
    `
  root.appendChild(info);
}

getTodoById(id)
.then(game => buildTodo(game))

async function loadCommentary() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    let comments = await response.json();
    return comments;
}
function mapeoComments(array) {
    let divComments = ''
    let arrayToyChiquito = array.filter(element => array.indexOf(element) < 6);
    arrayToyChiquito.map(element => {
        divComments = divComments + `<div class="border border-dark rounded  bg-light">
          <p class="font-weight-bold font-italic fontComments">${element.name} (${element.email}) commented:</p> ${element.body} 
           </div> 
           </br>`
    });
    commentsSection.innerHTML = divComments;
}
loadCommentary().then(objs => {
    let array = [];
    for (let key in objs) {
        if (objs.hasOwnProperty(key)) {
            let item = objs[key];
            array.push({
                name: item.name,
                email: item.email,
                body: item.body
            });
        }
    }
    mapeoComments(array);
});