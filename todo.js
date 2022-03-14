
//Element secme islemleri
const form= document.querySelector("#todo-form");
const todoınput= document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton=document.querySelector("#clear-todos");


eventListeners();///sikinti

function eventListeners() {//tum event listeners
    filter.addEventListener("keyup",filterTodos);
    form.addEventListener("submit",addTodo);
    secondCardBody.addEventListener("click",deleteTodo);   
    document.addEventListener("DOMContentLoaded",loadAllToDosToUI);
    clearbutton.addEventListener("click",clearAllTodos);
   
}

function clearAllTodos(e){

    if(confirm("tum todo ları silmekte eminmisiniz ? ")){
        //arayuzden to do ları silme
        //1->todoList.innerHTML="";  yavas

        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);

        }
        //storage den silme islemi
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    console.log("arama islemi yapılmaya baslandı");
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach((listItem) => {
            const text = listItem.textContent.toLowerCase();

                if (text.indexOf(filterValue) == -1) { //bulunamama durumus
                    listItem.setAttribute("style", "display :none !important");
                } else {
                    listItem.setAttribute("style", "display : block");
                }            

        });
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){//carpıya basınca yakala ve sil
        console.log("silme islemi");
        deleteTodoFromStorage(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
        
        showAlert("success","to do basarıyla silindi");
    }

}

function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    console.log("storage den to do silmeye baslandı ");
    console.log("todos : "+todos);
    console.log("deleteTodo : " + deleteTodo);
    console.log("deleteTodo.textContent : "+deleteTodo.textContent);
    todos.forEach(function(todo,index){
        if(todo===deleteTodo.textContent){
            todos.splice(index,1);
        }

    });
    localStorage.setItem("todos",JSON.stringify(todos));         

}

function loadAllToDosToUI(){
   let todos= getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){  
    const newTodo=todoınput.value.trim();

    if(newTodo===""){

        showAlert("danger","Lütfen bir to-do giriniz....");
    }else{


        //To do varmı yok mu kontrol 
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","To-Do'nuz basarili bir sekildi eklendi");

    }
    
    e.preventDefault();
}

function showAlert(type,message){


   /* <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div>*/

    const div=document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent =message;
    firstCardBody.appendChild(div);//////

    setTimeout(function(){
        div.remove();
    },1000);

}

function addTodoToUI(newTodo){//string degerinin list item olarak UI a ekleyecek
 
 
    /*<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>*/


    //list item olusturma
    const listItem=document.createElement("li");

    //link olusturme
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove' ></i>";
    listItem.className="list-group-item d-flex justify-content-between";

    //text node eklemek
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //to do liste eklemek
    todoList.appendChild(listItem);

    todoınput.value="";

}
function getTodosFromStorage(){//to-do ları storage den alan fonksıyon 
    let todos;
    //todos dige bir array varmı kontrol ett yoksa olustur
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    //todos olan stringi arraye cevirme
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    //local storageye ekleme kısmı
    localStorage.setItem("todos",JSON.stringify(todos));
   
}
//  todo varsa aynı isimli to do yu ekleme 
//todoList bosken silme veya arama islemi yaptırma 

//githuba yukle 
//pdp odevine basla
//java react kurusuna hazırlan 