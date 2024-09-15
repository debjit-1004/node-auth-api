const {validationResult } = require('express-validator')

const Post = require('../models/postModel')


const createPost = async  (req, res) => {
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

        const {title, description }= req.body;

        var obj = {
            title,
            description
        }

        if (req.body.categories){
            obj.categories = req.body.categories
        }


        const post = new  Post(obj);

        const postData = await  post.save();

        const postFulldata = await Post.findOne({_id:postdata.id}).populate('categories')

        return res.status(200).json({
            success: true,
            message: 'Post created',
            data: postData
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating  post',
            error: error.message
        });
    }
}

const getPosts = async  (req, res) => {
    try{
        

        const posts = await Post.find({}).populate('categories')

        return res.status(200).json({
            success: true,
            message: 'Post Fetched succesfully ',
            data: posts
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error getting  post',
            error: error.message
        });
    }
}

const deletePost = async  (req, res) => {
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

        const {id} = req.body;

        const isExists= await Post.findOne({_id:id})
        if(!isExists){
            return res.status(400).json({
                success: true,
                message: "Post doesn't  exist",
            });

        }

        await Post.findByIdAndDelete({_id:id})


        return res.status(200).json({
            success: true,
            message: 'Post Deleted  Succesfully ',
            
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error Deleting  post',
            error: error.message
        });
    }
}

const updatePost = async  (req, res) => {
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

        const {id, title, description} = req.body;

        const isExists= await Post.findOne({_id:id})
        if(!isExists){
            return res.status(400).json({
                success: true,
                message: "Post doesn't  exist",
            });

        }

        var updateObj = {
            title,
            description
        }

        const updatedPost = await Post.findByIdAndUpdate({_id:id},
            {set: updateObj}, {new: true})

        
        return res.status(200).json({
            success: true,
            message: 'Post Updated Succesfully ',
            data: updatedPost
            
        });




    }
    catch(error){
        console.error('Error finding  user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error Deleting  post',
            error: error.message
        });
    }
}


module.exports={
    createPost,
    getPosts,
    deletePost,
    updatePost
}