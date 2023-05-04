// const express = require('express')
// const exphbs = require('express-handlebars')

// const app = express()

// const conn = require('./db/conn')

// // Models
// const Task = require('./models/Task')

// // routes
// const taskRoutes = require('./routes/tasksRoutes')

// app.engine('handlebars', exphbs.engine())
// app.set('view engine', 'handlebars')

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// app.use(express.json())

// app.use(express.static('public'))

// app.use('/tasks', taskRoutes)

// conn
//   .sync()
//   .then(() => {
//     app.listen(3000)
//   })
//   .catch((err) => console.log(err))

// const express = require('express')
// const exphbs = require('express-handlebars')

// const app = express()

// const conn = require('./db/conn')

// // Models
// const Task = require('./models/Task')

// // routes
// const taskRoutes = require('./routes/tasksRoutes')

// app.engine('handlebars', exphbs.engine())
// app.set('view engine', 'handlebars')

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// app.use(express.json())

// app.use(express.static('public'))

// app.use('/tasks', taskRoutes)

// // Rota principal
// app.get('/', async (req, res) => {
//   const tasks = await Task.findAll({
//     order: [['id', 'DESC']],
//   })

//   res.render('home', {
//     layout: 'main',
//     tasks,
//   })
// })

// // Marcar compromisso como feito
// app.put('/tasks/:id', async (req, res) => {
//   const task = await Task.findByPk(req.params.id)

//   if (task) {
//     await task.update({
//       done: true,
//     })

//     res.sendStatus(200)
//   } else {
//     res.sendStatus(404)
//   }
// })

// conn
//   .sync()
//   .then(() => {
//     app.listen(3000)
//   })
//   .catch((err) => console.log(err))

// const express = require('express')
// const exphbs = require('express-handlebars')

// const app = express()

// const conn = require('./db/conn')

// // Models
// const Task = require('./models/Task')

// // routes
// const taskRoutes = require('./routes/tasksRoutes')

// app.engine('handlebars', exphbs.engine())
// app.set('view engine', 'handlebars')

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// app.use(express.json())

// app.use(express.static('public'))

// app.use('/tasks', taskRoutes)

// // Rota principal
// app.get('/', async (req, res) => {
//   const tasks = await Task.findAll({
//     order: [['id', 'DESC']],
//   })

//   res.render('home', {
//     layout: 'main',
//     tasks,
//   })
// })

// // Marcar compromisso como feito
// app.put('/tasks/:id/done', async (req, res) => {
//   const task = await Task.findByPk(req.params.id)

//   if (task) {
//     await task.update({
//       done: true,
//     })

//     res.sendStatus(200)
//   } else {
//     res.sendStatus(404)
//   }
// })

// const express = require('express')
// const exphbs = require('express-handlebars')

// const app = express()

// const conn = require('./db/conn')

// // Models
// const Task = require('./models/Task')

// // routes
// const taskRoutes = require('./routes/tasksRoutes')

// app.engine('handlebars', exphbs.engine())
// app.set('view engine', 'handlebars')

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// app.use(express.json())

// app.use(express.static('public'))

// app.use('/tasks', taskRoutes)

// // Rota principal
// app.get('/', async (req, res) => {
//   const tasks = await Task.findAll({
//     order: [['id', 'DESC']],
//   })

//   res.render('home', {
//     layout: 'main',
//     tasks,
//   })
// })

// // Rota para marcar uma tarefa como feita
// app.put('/tasks/:id/done', async (req, res) => {
//   const task = await Task.findByPk(req.params.id)

//   if (task) {
//     await task.update({
//       done: true,
//     })

//     res.sendStatus(200)
//   } else {
//     res.sendStatus(404)
//   }
// })

// // Função para marcar uma tarefa como feita
// function markDone(element) {
//   const id = element.dataset.id

//   fetch(`/tasks/${id}/done`, { method: 'PUT' })
//     .then(() => {
//       element.classList.toggle('bi-check2-square')
//       element.classList.toggle('bi-check2')
//     })
//     .catch((error) => console.log(error))
// }


// conn
//   .sync()
//   .then(() => {
//     app.listen(3000)
//   })
//   .catch((err) => console.log(err))

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

// Models
const Task = require('./models/Task')

// routes
const taskRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/tasks', taskRoutes)

// Rota principal
app.get('/', async (req, res) => {
  const tasks = await Task.findAll({
    order: [['id', 'DESC']],
  })

  res.render('home', {
    layout: 'main',
    tasks,
  })
})

// Rota para marcar uma tarefa como feita
app.put('/tasks/:id/done', async (req, res) => {
  const task = await Task.findByPk(req.params.id)

  if (task) {
    await task.update({
      done: true,
    })

    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

// Função para marcar uma tarefa como feita
function markDone(element) {
  const id = element.dataset.id

  fetch(`/tasks/${id}/done`, { method: 'PUT' })
    .then(() => {
      element.classList.toggle('bi-check2-square')
      element.classList.toggle('bi-check2')
    })
    .catch((error) => console.log(error))
}

// Rota para adicionar uma nova tarefa
app.post('/tasks/add', async (req, res) => {
  const { title, description, data_inicio, data_fim } = req.body

  try {
    const newTask = await Task.create({
      title,
      description,
      data_inicio: new Date(data_inicio),
      data_fim: new Date(data_fim),
    })

    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao cadastrar nova tarefa.')
  }
})

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))

