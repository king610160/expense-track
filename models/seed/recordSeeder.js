const bcrypt = require('bcryptjs')
if (process.env.PROCESS_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
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
      .then(() => {
        db.close()
        process.exit()
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