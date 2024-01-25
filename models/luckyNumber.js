const mongoose = require('mongoose')
const luckyNumberSchema = new mongoose.Schema({
  text: {type: String, required: true },
  number: {type: String, required: true },
})
module.exports = mongoose.model('LuckyNumber', luckyNumberSchema)
