if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require packages used in the project
const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")
const flash = require('connect-flash')
const routes = require('./routes')

// const usePassport = require('./config/passport')


// 加入這段 code, 僅在非正式環境時, 使用 dotenv


require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// usePassport(app)

app.use(flash())  // 掛載套件
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated()
//   res.locals.user = req.user
//   res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
//   res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
//   next()
// })

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})