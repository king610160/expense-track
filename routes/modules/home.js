const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')

router.get("/", (req, res) => {
    ExpenseTrack.find()   // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then(expenseTrack => res.render("index", { expenseTrack }))
    .catch(err => console.log(err))
})

module.exports = router