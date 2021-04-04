const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemRm = document.querySelectorAll('.item span.completed')
const importantBtn = document.querySelectorAll('.fa-exclamation-triangle')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteTodo)
})

Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(itemRm).forEach((element)=> {
    element.addEventListener('click', markUncomplete)
})

Array.from(importantBtn).forEach((element)=> {
    element.addEventListener('click', markImportant)
})


async function deleteTodo(){
    const toDo = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoItem': toDo
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const toDo = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoItem': toDo
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUncomplete(){
    const toDo = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoItem': toDo
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markImportant(){
    const toDo = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markImportant', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoItem': toDo
            })
          })
        const data = await response.json()
        console.log(importantBtn)
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
