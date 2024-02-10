// REAL TIME

const fullDay = document.querySelector('#full-day');

const hor = document.querySelector('#hour'),
    min = document.querySelector('#minute'),
    sec = document.querySelector('#second')

function realTime() {
    
    const today = new Date()
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const month = today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth();
    const year = today.getFullYear();


    const hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    const minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

    return {day: `${day}`, month: `${month}`, year: `${year}`, hour: `${hour}`, minute: `${minute}`, second: `${second}`,}
    
} 

setInterval(()=>{
    const {day, month, year, hour, minute, second,} = realTime();
    fullDay.textContent = `${day}.${month}.${year}`
    hor.textContent = `${hour}`;
    min.textContent = `${minute}`;
    sec.textContent = `${second}`;
},1000)

// FORM BLOCK

// SHOW THANKS ERROR MESSAGE

function showMessage(where, what) {
    document.querySelector(where).textContent = what;
    setTimeout(()=>{
        document.querySelector(where).textContent = '';
    },2000)
}
// SET ITEM LOCALSTORAGE 

let todolist  =  JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []
function setItem() {
    localStorage.setItem('list',JSON.stringify(todolist))
}

// TODO LIST BLOCK

const addBtn = document.getElementById('add-btn'),
    inputCreate = document.getElementById('input-create'),
    listGroup = document.getElementById('list-group-todo'),
    listGroupItem = document.querySelectorAll('li'),
    formCreate = document.getElementById('form-create'),
    messageCreate = document.getElementById('message-create')

    // localstorage

    function showTodos() {
        listGroup.innerHTML = '';
        if (todolist.length) {  
            todolist.forEach((item, index) =>{
                listGroup.innerHTML += 
                    `
                        <li class="list-group-item " ondblclick="doneTask(${index})">
                            <p class="list-group-item-text">${item.text}</p>
                            <div class="btn-block">
                                <p class="time m-1">${item.hour}:${item.minute} </p>
                                <p class="date m-1">${item.day}:${item.month}:${item.year} </p>
                                <img src="./img/edit.svg" alt="edit-btn" onclick="editList(${index})">
                                <img src="./img/delete.svg" alt="delete-btn" onclick="deleteList(${index})">
                            </div>
                        </li> 
                    ` 
            })
        }
    }
    showTodos()
    formCreate.addEventListener(`submit`, (e)=>{       
        e.preventDefault()
        if (!inputCreate.value.trim()) {
            showMessage('#message-create', 'Please write something else')
        }else if (inputCreate.value.trim()){ 
            const {day, month, year, hour, minute, second,} = realTime(); 
            todolist.push({
                text: `${inputCreate.value}`,
                hour: `${hour}`,
                minute: `${minute}`,
                day: `${day}`,
                month: `${month}`,
                year: `${year}`, 
            })
            setItem()
            showTodos()
        }
    })

    function deleteList(id) {
        const deleteTodo = todolist.filter((item, ind)=>{
            return ind !== id
        })
        todolist = deleteTodo;
        setItem()
        showTodos() 
    } 
    // MODAL BLOCK
    
    const overlay = document.getElementById('overlay'),
        modal = document.getElementById('modal'),
        inputEdit = document.getElementById('input-edit'),
        saveChange = document.getElementById('saveChange'),
        formEdit = document.getElementById('form-edit')

    document.addEventListener('click', (e)=>{
        if (e.target.id == 'close') {
            closeModal()
        }
    })

    function closeModal() {
        modal.classList.toggle('hidden')
            overlay.classList.toggle('hidden')
    }
    let index = 0 
    function editList(num) {
        closeModal() 
        inputEdit.value = todolist[num].text ;
        index = num;
    }
    formEdit.addEventListener('submit',(e)=>{
        e.preventDefault() 
        if (!inputEdit.value.trim()) {
            showMessage('#message-edit', 'Please write something else')
        }else { 
            todolist[index].text = inputEdit.value.trim()
            closeModal()
            setItem()
            showTodos()
        }
    })
    function doneTask(id) { 
        listGroup.children[id].classList.toggle('true');
    }