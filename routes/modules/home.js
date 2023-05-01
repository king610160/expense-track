const express = require('express')
const router = express.Router()
const SaveMoney = require('../../models/saveMoney')

router.get("/", (req, res) => {
    SaveMoney.find()   // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then(saveMoney => res.render("index", { saveMoney }))
    .catch(err => console.log(err))
})

module.exports = router