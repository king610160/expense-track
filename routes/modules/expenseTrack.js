const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')
const Category = require("../../models/category")

// 新增頁面
router.get("/new", (req, res) => {
  return Category.find()
    .lean()
    .then((categories) => res.render("new", { categories }))
    .catch((err) => console.log(err));
})

// 新增帳目
router.post("/", (req, res) => {
  const { event, date, categoryId, money } = req.body
  const userId = req.user._id

  if (!event || !date || !categoryId || !money) {
    return Category.findById(categoryId)
      .lean()
      .then(() => res.render(res.render("new", { event, date, money })));
  }

  return ExpenseTrack.create({ event, date, money, categoryId, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
})

// 編輯頁面
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return ExpenseTrack.findOne({ userId,_id })
    .lean()
    .then(expenseTrack => res.render("edit", { expenseTrack }))
    .catch(err => console.log(err))
})

// 編輯帳目
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const info = req.body
  return ExpenseTrack.findOneAndUpdate({ userId, _id }, info)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 刪除帳目
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return ExpenseTrack.findOne({ userId, _id })
    .then(expenseTrack => expenseTrack.deleteOne())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router