const express = require('express')
const router = express.Router()

const token = require('../config/token')

const bcrypt = require('bcrypt');
const { createUser } = require('../controllers/userController');
const saltRounds = 10;


router.post('/',createUser)

module.exports = router