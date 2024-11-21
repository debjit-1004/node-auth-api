const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')
const permissonController= require('../controllers/admin/permissionController')

const {onlyAdminAccess} = require('../middlewares/adminMiddleware')
const {permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator} = require('../helpers/adminValidator')


//Permission Routes
router.post('/admin/add-permission',auth,onlyAdminAccess ,permissionAddValidator,permissonController.addPermission)

router.get('/admin/get-permissions',auth , onlyAdminAccess,permissonController.getPermissions)

router.post('/admin/delete-permission',auth ,onlyAdminAccess,permissionDeleteValidator , permissonController.deletePermission)

router.post('/admin/update-permission',auth ,onlyAdminAccess ,permissionUpdateValidator,permissonController.updatePermission)

//roles routes
router.post('/admin/add-role',auth,onlyAdminAccess ,permissionAddValidator,permissonController


module.exports= router;