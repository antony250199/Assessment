const team_model = require('../models/oneToMany').Team
const player_model = require('../models/oneToMany').Player

exports.create_team = async (req, res) => {
  try {
    let player_info = {
      name: req.body.player.player_name,
      score: req.body.player.player_score,
    }
    let player = await player_model.create(player_info)
    if (player) {
      let data = {
        team_name: req.body.team_name,
        players_count: req.body.players_count,
        players: player,
      }
      let team = await team_model.create(data)
      res.json({ message: 'Team created successfully' })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Unable to add team', error: err })
  }
}

exports.get_team_list = async (req, res) => {
  try {
    let team_list = await team_model.find({}).populate('players')
    res.json({ message: 'Team list found successfully', list: team_list })
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: 'Unable to get list of team', error: err })
  }
}

exports.get_team = async (req, res) => {
  try {
    let team = await team_model
      .findOne({ _id: req.params.id })
      .populate('players')
    res.json({ message: 'House found successfully', data: team })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Unable to get team', error: err })
  }
}

exports.delete_team = async (req, res) => {
  try {
    let result = await team_model.findByIdAndDelete(req.params.id)
    console.log(result.players._id)
    let playerIds = result.players._id

    await player_model.deleteMany({
      _id: result.players._id,
    })

    res.json({ message: 'Team and player collections deleted successfully' })
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: 'Unable to delete team', error: err })
  }
}
