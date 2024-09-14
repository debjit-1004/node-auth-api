const Permission = require('../../models/permissionModel')
const { validationResult } = require('express-validator');


const addPermission= async (req,res)=>{
    try{
        // Get validation results
        const errors = validationResult(req);

        // Check if there are validation errors
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const {permission_name} =  req.body;


        const isExists = await Permission.findOne({permission_name})

        if (isExists){
            return res.status(500).json({
                success: false,
                message: 'Permission name already exists!',
            });

        }

        var obj= {
            permission_name: permission_name
        }

        if (req.body.default){
            obj.is_default = parseInt(req.body.default)
        }

        const permission = new Permission(obj)

        const newPermission = await  permission.save()
        
        return res.status(200).json({
            success: true,
            message: 'Permission added sucessfully',
            data: newPermission
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
}

module.exports={
    addPermission
}