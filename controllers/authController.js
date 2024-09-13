const user = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
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

        // Extract user data from request body
        const { name, email, password } = req.body;

        const existsUser= await  user.findOne({email});

        if  (existsUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'

        })}

        const hashedPassword= await  bcrypt.hash(password, 10);




        // Create a new user
        const newUser = new user({ name, email, password:hashedPassword});

        // Save the new user to the database
        const userData = await newUser.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};

module.exports = {
    registerUser
};
