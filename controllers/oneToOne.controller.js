const house_model = require('../models/oneToOne').House

exports.create_house = (req, res) => {
  let data = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    owner: req.body.owner,
  }
  house_model
    .create(data)
    .then((response) => {
      if (response) {
        return res.json({ message: 'House created successfully' })
      }
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(400)
        .json({ message: 'Unable to add house', error: err })
    })
}

exports.get_house_list = (req, res) => {
  house_model
    .find({})
    .then((response) => {
      res.json({ message: 'House list found successfully', list: response })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(400)
        .json({ message: 'Unable to get list of house', error: err })
    })
}

exports.get_house = (req, res) => {
  house_model
    .findOne({ _id: req.params.id })
    .then((response) => {
      res.json({ message: 'House found successfully', data: response })
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: 'Unable to get house', error: err })
    })
}

exports.delete_house = (req, res) => {
  house_model
    .deleteOne({ _id: req.params.id })
    .then((response) => {
      res.json({ message: 'House deleted successfully' })
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: 'Unable to delete house', error: err })
    })
}
