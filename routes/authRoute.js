const express = require('express')

const router = express.Router()

const auth = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController')
const {registerValidator, loginValidator} = require('../helpers/validator')


router.post('/register',registerValidator, authController.registerUser)
router.post('/login',loginValidator, authController.loginUser)


//authentication route
router.get('/profile',auth, authController.getProfile)









module.exports= router;