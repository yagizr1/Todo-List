// TODO EKLEME
const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners(){ // tüm event listenerlar
    form.addEventListener("submit", addtodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondcardbody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearbutton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){
    if (confirm("tümünü silmek istediğinize eminmisiniz")){
        // tüm elementleri temizleme 
        // todolist.innerHTML = "";
        
        while (todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // bulunamadı 

            listItem.setAttribute("style", "display : none !important");
        }

        else {
            listItem.setAttribute("style", "display : block");
        }

    });
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo){
        addtodoToUI(todo);
    })
}


function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStroage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi");
    }
    
    e.preventDefault();
}


function deleteTodoFromStroage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo){
            todos.splice(index,1);
        }

    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function addtodo(e) { 
    const newtodo = todoinput.value.trim();
    let todos = getTodosFromStorage();

    if (newtodo === "") {
        showAlert("danger", "Lütfen bir todo girin");
    } 
    else if (todos.includes(newtodo)) {
        showAlert("danger", "Bu todo zaten eklenmiş");
    } 

    else {
        addtodoToUI(newtodo);
        addtodoToStroage(newtodo);
        showAlert("success", "Todo başarıyla eklendi");
    }

    e.preventDefault();
}


function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }

    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addtodoToStroage(newtodo){
    let todos = getTodosFromStorage();
    todos.push(newtodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeOut

    setTimeout(function(){
        alert.remove();
    },2000);
}

function addtodoToUI(newtodo){ // string değerini UI'ya list item olarak ekleyecek
    /* <li class="list-group-item d-flex justify-content-between">
     Todo 1
     <a href = "#" class ="delete-item">
         <i class = "fa fa-remove"></i>
     </a> */ 

     // list item oluşturma
    const listitem = document.createElement("li");
    // link oluşturma
    const link = document.createElement("a");
    link.href = "a";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listitem.className = "list-group-item d-flex justify-content-between";

    // text node ekleme 
    listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(link);

    // todo liste list itemı ekleme 
    todolist.appendChild(listitem);
    todoinput.value = "";
}