const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')
const Category = require("../../models/category")



router.get("/", (req, res) => {
    const userId = req.user._id   

    return Category.find()
      .lean()
      .then((category) => {
    return ExpenseTrack.find({ userId })
      .populate("categoryId")   
      .lean()
      .sort({ date: 'asc' }) 
      .then((expenseTrack) => {
        let sum = 0
        for (i in expenseTrack) {
            expenseTrack[i].date = expenseTrack[i].date.toLocaleDateString() //把標準時間改成一般日期
            sum += expenseTrack[i].money
        }
        res.render("index", { expenseTrack, sum, category})
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

// 顯示資料排序
router.post("/", (req, res) => {
  const userId = req.user._id;
  const { categoryId } = req.body;

  if (categoryId === "all") {
    return res.redirect("/");
  }

  return Category.find()
    .lean()
    .then((category) => {
      return ExpenseTrack.find({ userId, categoryId })
        .populate("categoryId") // 以'categoryId'欄位把Expense跟Category資料庫關聯
        .lean()
        .sort({ date: "desc" })
        .then((expenseTrack) => {
          let sum = 0
          for (i in expenseTrack) {
            expenseTrack[i].date = expenseTrack[i].date.toLocaleDateString() //把標準時間改成一般日期
            sum += expenseTrack[i].money
          }
          return res.render("index", { expenseTrack, sum, category });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router