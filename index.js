const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
//todo handale barsni  ulash
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//todo === post malumotini todos.jstdan jonatganda json bop keladi
app.use(express.urlencoded({ extended: true }))

//todo css papkasini ulash
app.use(express.static(path.join(__dirname, 'public')))

//todo routes papkadan olish
app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://doni:12345@cluster0.zcuw8.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log(`Server ${PORT} da ishga tusdi.....`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
