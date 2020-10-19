   const todoList = document.getElementById('table');
   const form = document.getElementById('form');
   const editFormContainer = document.getElementById(`editFormContainer`)
 

    form.addEventListener('submit', e => {
      e.preventDefault();
      const namegame = document.getElementById('name').value;
      const stylegame = document.querySelector('input[name="style"]:checked').value;
      const categorygame = document.getElementById('category').value;
      const publishedgame= document.querySelector('input[name="published"]:checked').value =='true'
      const data = { name: namegame, style: stylegame, category: categorygame,publicado:publishedgame,destacado:'no'};
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
        ${game.destacado}
        </td>
        
        <td>
        <button id= ${game.id} type="button" class="btndelete deleteButton  btn text-white">Borrar</button>
        </td>
        <td>
        <button id= ${game.id} type="button" class=" btnedit editButton btn text-white">Editar</button>
        </td>
        <td>
        <button type="button" class=" btndestacado btn text-white">Destacado</button>
        </td>
      `
        todoList.appendChild(row);
        
      })
    }
    
      
       async function postNewTodo({ name,style,category,publicado,destacado}) {
       const url = 'http://localhost:3000/Games';
       const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({ name,style,category,publicado,destacado})
      })
      const newData = await response.json();
      console.log(newData);
      debugger
    }
    
    async function deleteVideoGame (id) {
      const newURL = `http://localhost:3000/Games/${id}`;
      const response = await fetch(newURL, {
        method: 'DELETE'
      })
    }


    getTodos().then(Games => buildTodo(Games));
    
    todoList.addEventListener(`click`, e => {
      if(e.target.classList.contains(`deleteButton`)) {
        const id = e.target.id;
        
        deleteVideoGame(id);
      }
    })
    
    todoList.addEventListener(`click`,e => {
      if(e.target.classList.contains(`editButton`)) {
        const id = e.target.id;
        getgamesbyId(id).then(game => createForm(game))
    }
    } )

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
      <div>
          <label for="todoInput">Id:</label><br>
          <input value="${values.id}" type="text" placeholder="Ingrese Id" id="idvalue" />
        </div>
        <div>
          <label for="todoInput">Name:</label><br>
          <input value="${values.name}" type="text" placeholder="Ingrese Nombre" id="namevalue" />
        </div>
        <div>
          <label for="todoInput">Nombre:</label><br>
          <input value="${values.category}" type="text" placeholder="Ingrese Categoria" id="categoryvalue" />
        </div><div>
        <label for="todoInput">Nombre:</label><br>
        <input value="${values.style}" type="text" placeholder="Añadir tarea" id="stylevalue" />
      </div><div>
      <label for="todoInput">Nombre:</label><br>
      <input value="${values.publicado}" type="text" placeholder="Añadir tarea" id="publicadovalue" />
    </div>
      <button class="putContent" id=${values.id} type="submit">Editar</button>
      `
      editFormContainer.appendChild(form);
    }


    async function editTodo(id, inputData) {
      const url= `http://localhost:3000/Games/${id}`;
      const response = await fetch(url, {
        method: 'POST', /*PUT*/
        body: JSON.stringify(inputData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json();
      return data;
    }

    /*async function editTodo(id, inputData) {
      const url= `http://localhost:3000/games/${id}`;
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
    }*/

    editFormContainer.addEventListener('submit', e => {
      if (e.target.classList.contains('putContent')) {
        e.preventDefault();
        const idvalue = document.getElementById(`idvalue`).value
        const namevalue = document.getElementById(`namevalue`).value
        const categoryvalue = document.getElementById(`categoryvalue`).value
        const stylevalue = document.getElementById(`stylevalue`).value
        const publicadovalue = document.getElementById(`publicadovalue`).value
        const inputData = {id: idvalue, name: namevalue, category: categoryvalue, style: stylevalue, publicado: publicadovalue}
        editTodo(id, inputData);
      }
    })
 
    /*const data = {id: idvalue, name: namevalue, category: categoryvalue, style: stylevalue, publicado: publicadovalue}
        editTodo(idvalue, data);*/