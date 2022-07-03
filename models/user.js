const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  state: String,
  regon: {
    type: Date,
    default: Date.now,
  },
})

const user = mongoose.model('users', userSchema)
module.exports = user
