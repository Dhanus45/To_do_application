
let todo = JSON.parse(localStorage.getItem("todo"));

const todoInput=document.getElementById('todoInput');
const todoList=document.getElementById('todolist');
const todoCount=document.getElementById('spancounter');
const addbutton=document.querySelector('.btn');
const deletebuton=document.getElementById('delete');



document.addEventListener('DOMContentLoaded',function(){
    addbutton.addEventListener('click',addTask);
    addbutton.addEventListener('keydown',function(event){
        if(event.key =='enter')
        {
            event.preventDefault();
            addTask();
        }
    });
    deletebuton.addEventListener('click',deletAllTask());
    displayTask();
});



function addTask(){
    const newTask=todoInput.value.trim();
    if(newTask!==""){
        todo.push({text:newTask,diabled:false});
        saveToLocalStorage();
        todoInput.value='';
        displayTask();

    }
}


function displayTask(){
    todoList.innerHTML='';
    todo.forEach((item,index) => {
        const p=document.createElement('p');
        p.innerHTML=`
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox">
        id="input-${index}"${item.diabled ? "checked":""   
        }><p id="todo-${index} class="${
            item.disabled ? "disabled":""
        }" onclick="editTask(${index})">${item.text}</p>
        </div>
        }`;
        p.querySelector(".todo-checkbox").addEventListener('change',()=>{
            ToggleTask(index);
            todoList.appendChild(p);
            console.log('text displayed')
        });
        todoCount.textContent=todo.length;
    });
}

    function editTask(index){
        const todoItem=document.getElementById(`todo-${index}`)
        const exsistingText=todo[index].text;
        const inputElement=document.createElement('input')
        inputElement.addEventListener('blur',function(){
            const updatedText=inputElement.value.trim()
        if(updatedText){
            todo[index].text=updatedText;
            saveToLocalStorage();
        }
        displayTask();
    })
    } 

function ToggleTask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();
    displayTask();
}

function deletAllTask(){
    todo=[];
    saveToLocalStorage();
    displayTask();
}

function saveToLocalStorage(){
    localStorage.setItem('todo',JSON.stringify(todo));
}