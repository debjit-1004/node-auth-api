const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')
const {registerValidator} = require('../helpers/validator')

router.post('/register',registerValidator, authController.registerUser)
router.post('/register',registerValidator, authController.loginUser)






module.exports= router;