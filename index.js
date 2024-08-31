require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1.27017/user_roles");

const express =  require('express');
const app =  express();
app.use(express.static('public'))


const post= process.env.SERVER_PORT || 3000

app.listen(post,()=>{
    console.log(`server is running on port ${post}`)
})
