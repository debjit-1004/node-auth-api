const { validationResult } = require('express-validator');

const Category = require('../models/categoryModel')

const addCategory= async  (req, res) => {
    try{
        const errors = validationResult(req);

        // Check if there are validation errors
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const {category_name} = req.body;

        const isExists = await  Category.findOne({
            name:{
                $regex: category_name, $options: 'i' 
            }
        })

        if (isExists){
            return res.status(400).json({
                success: false,
                message: 'Category  already exists',

               
            });

        }


        const category = new Category({
            name:category_name
        })


        const categoryData = await  category.save();

        return res.status(200).json({
            success: true,
            message: 'added the catagory sucessfully',
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
}

const getCategories= async  (req, res) => {
    try{
        const categories = await Category.find({})

        return res.status(200).json({
            success: true,
            message: 'Categories Fetched Sucessfully',
            data: categories
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
}


module.exports={
    addCategory,
    getCategories
}