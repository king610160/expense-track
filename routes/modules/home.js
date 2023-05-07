const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')
// const expenseTrack = require('../../models/expenseTrack')

router.get("/", (req, res, next) => {
    const userId = req.user._id   // 變數設定
    ExpenseTrack.find({ userId })   // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then((expenseTrack) => {
        let sum = 0
        for (i in expenseTrack) {
            expenseTrack[i].date = expenseTrack[i].date.toLocaleDateString()
            sum += expenseTrack[i].money
        }
        res.render("index", { expenseTrack ,sum })
    })
    .catch(err => console.log(err))
})

module.exports = router