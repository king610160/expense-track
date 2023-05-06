const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expenseTrack = require('./modules/expenseTrack')

router.use('/', home)
router.use('/expenseTrack', expenseTrack)

module.exports = router