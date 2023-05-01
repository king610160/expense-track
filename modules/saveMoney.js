const mongoose = require("mongoose")
const Schema = mongoose.Schema

const saveMoneySchema = new Schema({
  event: { type: String, required: true },
  category: { type: String, required: true },
  money: { type: Number, required: true },
  Date: {
    type: Date,
    default: Date.now
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model("saveMoney", saveMoneySchema)