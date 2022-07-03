module.exports = (app) => {
  const controller = require('../controllers/manyToMany.controllers')

  const route = require('express').Router()

  route.post('/add_travel', controller.create_travel)
  route.get('/get_travel', controller.get_travel_list)
  route.get('/get_travel/:id', controller.get_travel)
  route.delete('/delete_travel/:id', controller.delete_travel)

  app.use('/travelApi', route)
}
