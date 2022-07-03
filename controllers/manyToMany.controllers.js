const travel_model = require('../models/manyToMany').Travel
const vehicle_model = require('../models/manyToMany').Vehicle
const travel_list_model = require('../models/manyToMany').Travel_list

exports.create_travel = async (req, res) => {
  try {
    let travel_info = {
      name: req.body.name,
      address: req.body.address,
    }
    let travel = await travel_model.create(travel_info)
    let vehicle_info = {
      vehicle_name: req.body.vehicle_name,
      reg_no: req.body.reg_no,
    }
    let vehicle = await vehicle_model.create(vehicle_info)
    let travel_list = await travel_list_model.create({
      travel: travel,
      vehicle: vehicle,
    })
    res.json({ message: 'travel added successfully' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Unable to add travel', error: err })
  }
}

exports.get_travel_list = async (req, res) => {
  try {
    let travel_list = await travel_list_model
      .find({})
      .populate('vehicle')
      .populate('travel')
    res.json({ message: 'Travel list found successfully', list: travel_list })
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: 'Unable to get list of travel', error: err })
  }
}

exports.get_travel = async (req, res) => {
  try {
    let travel = await travel_list_model
      .findOne({ _id: req.params.id })
      .populate('vehicle')
      .populate('travel')
    res.json({ message: 'House found successfully', data: travel })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Unable to get travel', error: err })
  }
}

exports.delete_travel = async (req, res) => {
  try {
    let result = await travel_list_model.findByIdAndDelete(req.params.id)
    console.log(result.vehicle._id)
    let playerIds = result.travel._id

    await vehicle_model.deleteMany({
      _id: result.vehicle._id,
    })

    await vehicle_model.deleteMany({
      _id: result.travel._id,
    })

    res.json({ message: 'Travel and Vehicle collections deleted successfully' })
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: 'Unable to delete travel', error: err })
  }
}
