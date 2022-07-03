const express = require('express')
const usermodel = require('../models/user')
const jwt = require('jsonwebtoken')

const jwt_secret = 'Phantom'

exports.login = (req, res) => {
  usermodel.findOne({ email: req.body.email }, (err, result) => {
    if (err) {
      res.json({ status: 0, error: 1 })
    } else {
      if (result == null) {
        res.json({ status: 0, msg: 'user does not exist' })
      } else {
        if (req.body.password == result.password) {
          var token = jwt.sign({ id: result._id }, jwt_secret)
          res.json({
            status: 1,
            msg: 'login success',
            user: result,
            token: token,
          })
        } else {
          res.json({ status: 0, msg: 'incorrect password' })
        }
      }
    }
  })
}

exports.get_user_list = (req, res) => {
  const token = req.headers.token
  jwt.verify(token, jwt_secret, async (err, decoded) => {
    if (err) {
      res.json({
        message: 'Unauthorised user',
        error: err,
      })
    } else {
      usermodel.find((err, result) => {
        if (err) {
          res.json({ status: 0, error: err })
        } else {
          res.json({ status: 1, userlist: result })
        }
      })
    }
  })
}

exports.create_user = (req, res) => {
  usermodel.findOne({ email: req.body.email }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      if (result == null) {
        usermodel.create(req.body, (err, result) => {
          if (err) {
            res.send('Unable to add register')
          } else {
            res.json({ msg: 'User registered successfully' })
          }
        })
      } else {
        res.json({ msg: 'User already exist' })
      }
    }
  })
}
