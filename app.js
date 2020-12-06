// Selectors
const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Functions
function addTodo(event) {
    // Prevent from from submitting
    event.preventDefault()
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn');
    todoDiv.appendChild(completedButton);
     // check mark button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add('trash_btn');
     todoDiv.appendChild(trashButton);
    //  Append to list
    todoList.appendChild(todoDiv)
    // clear Todo Input VALUE
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete todo
    if(item.classList[0] === "trash_btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        // todo.remove();
    }

    // Check Mark
    if(item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    console.log("Every works Fine");
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);

    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn');
    todoDiv.appendChild(completedButton);
     // check mark button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add('trash_btn');
     todoDiv.appendChild(trashButton);
    //  Append to list
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// concept
// const todos = ['Js', 'Python', 'Ruby', 'Go', 'Angular', 'next js', 'ada', 'ada'];

// const pythonIndex = todos.indexOf('Python');

// todos.splice(pythonIndex, 1);

// console.log(todos);