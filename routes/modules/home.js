const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')
const Category = require("../../models/category");
// const CategorySeed = require('../../models/seed/categorySeeder').results



router.get("/", (req, res) => {
    const userId = req.user._id   // 變數設定
    ExpenseTrack.find({ userId })   // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then((expenseTrack) => {
        let sum = 0
        let a = ''
        for (i in expenseTrack) {
            expenseTrack[i].date = expenseTrack[i].date.toLocaleDateString()
            sum += expenseTrack[i].money
            // if (expenseTrack[i].category === '餐飲食品') {
            //     a = CategorySeed.slice(0, 1).value
            //     console.log(a)
            // }
        }
        res.render("index", { expenseTrack ,sum })
    })
    .catch(err => console.log(err))
})

module.exports = router