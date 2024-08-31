const user= require('../models/userModel')
const {validationResult}= require('express-validator')


const registerUser= (req, res)=>{
    try{
        const  errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(200).json({
                sucess: false,
                message: errors,
                errors: errors.array() })


    }}
    catch{
        res.status(400).json({
            sucess: false,
            message: "Error registering user"
        })
    }
}

module.exports ={
    registerUser
}