const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')

const {categoryAddValidator} = require('../helpers/adminValidator')
const categoryController = require('../controllers/categoryController')


//Permission Routes
router.post('/add-category',auth ,categoryAddValidator,categoryController.addCategory)
router.post('/get-categories',auth ,categoryController.getCategories )



module.exports= router;