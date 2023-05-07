const express = require('express')
const router = express.Router()
const ExpenseTrack = require('../../models/expenseTrack')

// 新增頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 新增帳目
router.post("/", (req, res) => {
  const info = req.body
  info.userId = req.user._id
  ExpenseTrack.create(info)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
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

// 更新帳目
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