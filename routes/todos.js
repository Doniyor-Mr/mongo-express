const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


// find qilib hamas malumotlarni oladi
router.get('/', async (req, res) => {
  const todos = await Todo.find({})

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

// post orqali inputga name='title' sini req.body.title qvoladi
router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  })

  await todo.save()
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)

  //complrted boolean ekanligi uchun oldiga  2ta !! qoyiladi
  todo.completed = !!req.body.completed
  await todo.save()

  res.redirect('/')
})

module.exports = router
