module.exports = (app) => {
  const controller = require('../controllers/oneToOne.controller')

  const route = require('express').Router()

  route.post('/add_house', controller.create_house)
  route.get('/get_house', controller.get_house_list)
  route.get('/get_house/:id', controller.get_house)
  route.delete('/delete_house/:id', controller.delete_house)

  app.use('/houseApi', route)
}
