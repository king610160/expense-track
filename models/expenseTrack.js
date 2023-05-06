const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseTrackSchema = new Schema({
  event: { type: String, required: true },
  category: { type: String, required: true },
  money: { type: Number, required: true },
  date: { type: Date, required: true },
  // userId: {  
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   index: true,
  //   required: true
  // }
})

module.exports = mongoose.model("expenseTrack", expenseTrackSchema)