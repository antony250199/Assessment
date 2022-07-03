module.exports = (app) => {
  const controller = require('../controllers/oneToMany.controller')

  const route = require('express').Router()

  route.post('/add_team', controller.create_team)
  route.get('/get_team', controller.get_team_list)
  route.get('/get_team/:id', controller.get_team)
  route.delete('/delete_team/:id', controller.delete_team)

  app.use('/teamApi', route)
}
