// 確定是否有dotenv，若有則先套用
if (process.env.MONGODB_URI !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const PORT = process.env.PORT
require('./config/mongoose')

const app =  express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(PORT, () => {
    console.log(`App is listening on loaclhost:${PORT}`)
})