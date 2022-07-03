const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  score: Number,
})
const Player = mongoose.model('Player', playerSchema)

const teamSchema = new Schema({
  team_name: String,
  players_count: Number,
  players: { type: mongoose.Types.ObjectId, ref: 'Player' },
})
const Team = mongoose.model('Team', teamSchema)

module.exports = { Player, Team }
