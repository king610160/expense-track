const bcrypt = require('bcryptjs')
if (process.env.PROCESS_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const ExpenseTrack = require("../expenseTrack")
const ExpenseTrackList = require("./expenseTrack.json").results
const Member = require('../users')
const memberData = require('./users.json')

db.once("open", () => {
  console.log("running recordSeeder script...")
  const promises = memberData.map(USER => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(USER.password, salt))
      .then(hash => Member.create({
        name: USER.name,
        email: USER.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const name = user.name
        let expenseTrack = []
        if (name === memberData[0].name) {
          expenseTrack = ExpenseTrackList.slice(0, 5)
        } else {
          expenseTrack = ExpenseTrackList.slice(5, 10)
        }
        return ExpenseTrack.create(
          expenseTrack.map(r => Object.assign(r, { userId }))
        )
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .then(() => {
      console.log('recordSeeder done!')
      process.exit()
    })
    .catch(err => console.log(err))
})