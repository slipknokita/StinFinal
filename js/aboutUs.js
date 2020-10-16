let cardList = document.getElementById("cardList");
let developers = [
    {name: "Adriana Pérez Albert", image:"/img/adriana.png"},
    {name: "David Moisés Sarhid", image:"/img/david.png"},
    {name: "Enrico Palerno", image:"/img/enrico.png"},
    {name: "Giselle Mangini", image:"/img/giselle.png"},
    {name: "Ivo Montanari", image:"/img/ivo.png"},
    {name: "Sebastian Andrade", image:"/img/Sebas.png"}
]


for(let i = 0; i < developers.length; i++) {
    let name = developers[i].name;
    let image = developers[i].image;
    cardList.innerHTML += `
    <div class="card mb-3 mx-auto" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${image}" class="card-img" alt="Developer">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Developer FullStack Comision 4I.</p>
                </div>
            </div>
        </div>
    </div>
    `}