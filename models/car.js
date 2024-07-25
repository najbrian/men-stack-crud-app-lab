const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  year: {type: Number, required: true},
  make: {type: String, required: true},
  model: {type: String, required: true},
  color: {type: String, required: true},
  isAbleToStart: Boolean,
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car