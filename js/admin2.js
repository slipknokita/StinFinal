const todoList = document.getElementById('table');
const form = document.getElementById('form');
const editFormContainer = document.getElementById(`editFormContainer`);
const deleFormContainer = document.getElementById(`deleFormContainer`);



    form.addEventListener('submit', e => {
      e.preventDefault();
      const namegame = document.getElementById('name').value;
      const stylegame = document.querySelector('input[name="style"]:checked').value;
      const categorygame = document.getElementById('category').value;
      const imagegame = document.getElementById('imagen').value;
      const publishedgame= document.querySelector('input[name="published"]:checked').value =='true'
      const data = { name: namegame, style: stylegame, category: categorygame,imgSource:imagegame,publicado:publishedgame,destacado:'no'};
      postNewTodo(data);
    })

   
    async function getTodos() {
      const url = 'http://localhost:3000/Games';
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    function buildTodo(Games) {
      Games.map(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        ${game.id}
        </td>
        <td>
        ${game.name}
        </td>
        <td>
        ${game.style}
        </td>
        <td>
        ${game.category}
        </td>
        <td>
        ${game.publicado}
        </td>
        <td>
        <img src="${game.imgSource}" class="card-img" alt="...">
        </td>
        <td class="">
        <button id= ${game.id} type="button" class="btn btndelete deleteButton text-white" data-toggle="modal" data-target="#modalForm1"><span class="fas fa-trash-alt"></span>Borrar</button>
        </td>
        <td class="">
        <button id= ${game.id} type="button" class="btn  btnedit editButton text-white" data-toggle="modal" data-target="#modalForm"><span class="fas fa-edit"></span>Editar</button>
        </td>
        <td id="${game.destacado}">
        <button id= ${game.id} type="button" class="btndestacado btn text-white"><span id="${game.destacado}"  class="estrella"></span>Destacado</button>
        </td>
      `
        todoList.appendChild(row);
      })
      let starOnOff = document.querySelectorAll(".estrella");
      console.log(starOnOff)
      for (i=0; i<starOnOff.length;i++){
        if (starOnOff[i].id === "si"){
          starOnOff[i].classList.add("fas","fa-star")
        }else {
          starOnOff[i].classList.add("far","fa-star")
        }
      }
    }
      
    async function postNewTodo({ name,style,category,imgSource,publicado,destacado}) {
       const url = 'http://localhost:3000/Games';
       const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,style,category,imgSource,publicado,destacado})
      })
      const newData = await response.json();
      console.log(newData);
      debugger
    }
    
    
    getTodos().then(Games => buildTodo(Games));
 



    async function deleteVideoGame (id) {
      console.log(id);
      const newURL = `http://localhost:3000/Games/${id}`;
      const response = await fetch(newURL, {
        method: 'DELETE'
      })
    }
    
     
    todoList.addEventListener(`click`, e => {
      if(e.target.classList.contains(`deleteButton`)) {
        const id = e.target.id;
        getgamesbyId(id).then(game => deleteForm(game))
      }
    })

    function deleteForm(game) {
      const form = document.createElement('form');
      form.id = 'deleForm'
      form.classList.add('deletForm')
      form.innerHTML = `
      <div class="modal fade" id="modalForm1" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel1">Borrar Juego</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body commontexts">
          <h4 id:"modaltextodelete"> ¿Esta Seguro de eliminar este juego?</h5>
          </div>
         <div class="modal-footer">
         <button  class="btn btn-success aceptar putContent" id= ${game.id} >Si</button>
         <button  type="button" class="btn btn-success putContent" data-dismiss="modal">No</button>
         </div>
        </div>
      </div>
    </div>
      `
      deleFormContainer.appendChild(form);
    }


    
    deleFormContainer.addEventListener(`click`, e => {
      if(e.target.classList.contains(`aceptar`)) {
        const id = e.target.id;
        
        deleteVideoGame(id);
      }
    })
    //
    
    todoList.addEventListener(`click`,e => {
      if(e.target.classList.contains(`editButton`)) {
        const id = e.target.id;
        getgamesbyId(id).then(game => createForm(game))
    }
    })

    async function getgamesbyId(id) {
      const url = `http://localhost:3000/Games/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    function createForm(values) {
      const form = document.createElement('form');
      form.id = 'editForm'
      form.classList.add('editableForm')
      form.innerHTML = `
      <div class="modal fade" id="modalForm" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Panel de Edicion</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          
          <div>
          <label for="todoInput">Id:</label>
          <br>
          <input value="${values.id}" type="text" placeholder="Ingrese Id" id="idvalue" required/>
        </div>
        <div>
          <label for="todoInput">Nombre:</label>
          <br>
          <input value="${values.name}" type="text" placeholder="Ingrese Nombre" id="namevalue" required/>
        </div>
        <div>
          <label for="todoInput">Categoria:</label>
          <br>
          <input value="${values.category}" type="text" placeholder="Ingrese Categoria" id="categoryvalue" required/>
        </div>
        <div>
          <label for="todoInput">Estilo:</label>
          <br>
          <input value="${values.style}" type="text" placeholder="Añadir tarea" id="stylevalue" required/>
        </div>
        <div>
          <label for="todoInput">Publicado:</label>
          <br>
          <input type="radio"  name="published" value="true"> Si <br>
          <input type="radio" name="published" value="false"> No <br>
        </div>
        <div>
        <label for="todoInput">Imagen:</label>
        <br>
        <input value="${values.imgSource}" type="text" placeholder="Añadir tarea" id="imgvalue" />
      </div>
      <div>
      <label for="todoInput">Destacado:</label>
      <br>
      <input value="${values.destacado}" type="text" placeholder="Añadir tarea" id="destacadovalue" />
    </div>
      <button class="btn btn-success putContent" id=${values.id} type="submit">Editar</button>
          
          </div>
        </div>
      </div>
    </div>
      `
      editFormContainer.appendChild(form);
    }


    async function editTodo(id, inputData) {
      const url= `http://localhost:3000/Games/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json();
      return data;
    }

    editFormContainer.addEventListener('submit', e => {
        e.preventDefault();
        const idvalue = document.getElementById(`idvalue`).value;
        const namevalue = document.getElementById(`namevalue`).value;
        const categoryvalue = document.getElementById(`categoryvalue`).value;
        const stylevalue = document.getElementById(`stylevalue`).value;
        const publicadovalue= document.querySelector('input[name="published"]:checked').value =='true';
        const imgvalue = document.getElementById(`imgvalue`).value;
        const destacadovalue = document.getElementById(`destacadovalue`).value;
        const data = {id: idvalue, name: namevalue, category: categoryvalue, style: stylevalue, publicado: publicadovalue, imgSource:imgvalue, destacado:destacadovalue}
        editTodo(idvalue, data);
    })
 


    /*Ivo*/
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

todoList.addEventListener(`click`, e => {
  if(e.target.classList.contains(`btndestacado`)) {
    const id = e.target.id;
    const dataDestacado = {destacado: "si"}
    destacarVideogame(id, dataDestacado);
  }
})

async function destacarVideogame (id, dataDestacado) {
  console.log(id)
  console.log(dataDestacado)
  const newURL = `http://localhost:3000/Games/${id}`;
  const response = await fetch(newURL, {
    method: 'PATCH',
    body: JSON.stringify(dataDestacado),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  const data = await response.json();
  return data;
}

