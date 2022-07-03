const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Owner = new Schema({
  name: String,
})

const houseSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  owner: Owner,
})
const House = mongoose.model('House', houseSchema)
module.exports = { House }
