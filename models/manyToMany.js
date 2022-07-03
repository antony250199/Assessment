const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
  name: String,
  address: String,
})

const Travel = mongoose.model('Travel', travelSchema)

const vehicleSchema = new mongoose.Schema({
  vehicle_name: String,
  reg_no: String,
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

const travelVehicleSchema = {
  travel: { type: mongoose.Types.ObjectId, ref: 'Travel' },
  vehicle: { type: mongoose.Types.ObjectId, ref: 'Vehicle' },
}

const Travel_list = mongoose.model('Travel_list', travelVehicleSchema)

module.exports = { Travel, Vehicle, Travel_list }
