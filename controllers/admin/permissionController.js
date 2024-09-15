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


        const isExists = await Permission.findOne({
            permission_name:{
                $regex: permission_name, $options: 'i'
            }
        })

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
            message: 'Error adding permission',
            error: error.message
        });
    }
}

const getPermissions= async  (req, res) => {
    try{
        const  permissions = await Permission.find({});
        return res.status(200).json({
            success: true,
            message: "Permissions Fetched Sucessfully",
            data: permissions
        });

    }
    catch(error){
        return res.status(500).json({
        success: false,
        message: 'Error getting permissions',
        error: error.message
    });}
}

const deletePermission = async  (req, res) => {
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

         const id = req.body; 

         await Permission.findByIdAndDelete({_id:id});

         return res.status(500).json({
            success: true,
            message: "Permissionm Deleted Sucessfully",
        });
        

    }
    catch(error){
        return res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: error.message
    });}
}


const updatePermission = async (req,res)=>{
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

        const {id , permission_name} =  req.body;


        const isExists = await Permission.findOne({_id: id })

        if (!isExists){
            return res.status(500).json({
                success: false,
                message: 'Permission id not found !!',
            });

        }

        const isNameAssigned = await Permission.findOne({
            _id: {$ne: id},
            permission_name:{
                $regex: permission_name, $options: 'i'
            }
        
        })

        if (!isNameAssigned){
            return res.status(400).json({
                success: false,
                message: 'Permission name already assigned to another permission',
            });

        }




        var updatePermission= {
            permission_name: permission_name
        }

        if (req.body.default != null){
            obj.is_default = parseInt(req.body.default)
        }

       const updatedPermission = await Permission.findByIdAndUpdate({_id:id},
        {$set: updatePermission},
       {new:true})
        
        return res.status(200).json({
            success: true,
            message: 'Permission updated sucessfully',
            data: updatedPermission
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: "Permission id not found "
        });
    }
}


module.exports={
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}