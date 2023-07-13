
const router = require('express').Router();
//const express = require('express')
const User = require('../models/User.model')
const bcrypt = require("bcryptjs")
//const router = express.Router()


/* GET Signup page */
router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
  })

  router.post('/signup', async (req, res) => {
    const payload = {...req.body};
    delete payload.password;
    const salt = bcrypt.genSaltSync(13)
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = User.create(payload)
        console.log('New User:', newUser)
    } catch (error) {
            console.log(err)
        }
    })




  module.exports = router;