const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const expenseTrack = require('./modules/expenseTrack')

router.use('/', home)
router.use('/users', users)
router.use('/expenseTrack', expenseTrack)

module.exports = router