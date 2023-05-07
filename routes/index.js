const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const expenseTrack = require('./modules/expenseTrack')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')


router.use('/users', users)
router.use('/expenseTrack', expenseTrack)
router.use('/auth', auth)
router.use('/', authenticator,home)

module.exports = router