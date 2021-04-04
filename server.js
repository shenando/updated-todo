const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todos'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('todos').find().toArray()
    .then(todoItems => {
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: todoItems, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false, important: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.todoItem},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))
})

app.put('/markUncomplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.todoItem},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Uncomplete')
        response.json('Marked Uncomplete')
    })
    .catch(error => console.error(error))
})

app.put('/markImportant', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.todoItem},{
        $set: {
            completed: false,
            important: true
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Marked Important')
        response.json('Marked Important')
    })
    .catch(error => console.error(error))
})

app.put('/markUnimportant', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.todoItem},{
        $set: {
            completed: false,
            important: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Unimportant')
        response.json('Marked Unimportant')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTodo', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.todoItem})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})