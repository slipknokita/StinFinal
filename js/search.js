const searchBar = document.getElementById ("searchBar");
const resultContainer = document.getElementById("gamesList");
const searchBtn = document.getElementById("searchBtn");

URLsearch = 'http://localhost:3000/Games'
let gamesSearch;


searchBtn.addEventListener ('click',removeSearch);

function removeSearch (e){
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
    document.getElementById('inputFather').reset();
    e.preventDefault();
}

searchBar.addEventListener('keyup',(e)=>{
    console.log (e.target.value)
const searchValue = e.target.value.toLowerCase(); 
const filteredGames = gamesSearch.filter ((game => {
    return (
    game.name.toLowerCase().includes(searchValue) || 
    game.style.toLowerCase().includes(searchValue) || 
    game.category.toLowerCase().includes(searchValue)
    );
}));
console.log(filteredGames)
displayGamesSearch (filteredGames)
});


const getGames = async url_api => {
  try {
    const response = await fetch(url_api);
    let games = await response.json();
    pushArray(games);
  } catch (error) {
    if(error) {
      const error = new Error('Hubo un error', url_api)
      return error
    }
  }
} 
  getGames(URLsearch)


function pushArray (games) {
    gamesSearch = games;
    console.log(gamesSearch)
}


const displayGamesSearch = (games) => {
  const htmlGames = games
      .map((game) => {
        if (game.publicado === true) {
          return `
          <div class =" ml-3 mr-3 newCardsResults col-xs-12 col-sm-12 col-md-6 col-lg-2 "> 
          <div class=" thumbnail text-white card mb-3" style="background-color: rgba(0,0,0,0.4);">
            <img class="card-img-top"src="${game.imgSource}"
            <div class="card-body">
              <div class="card-title">${game.name}</div>
              <div class="card-text">${game.style}</div>
            </div>
          </div>
          </div>
      `;
      }
    })
      .join('');
  resultContainer.innerHTML = htmlGames;
  resultContainer.addEventListener('click',redirectCards)
};

function redirectCards(e) {
    window.location.href="detail.html";
}

getGames(URLsearch);


