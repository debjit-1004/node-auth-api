const express = require('express')
const router = express.Router()

const permissonController= require('../controllers/admin/permissionController')

const {permissionAddValidator} = require('../helpers/adminValidator')

router.post('/admin/add-permission',permissionAddValidator,permissonController.addPermission)


module.exports= router;