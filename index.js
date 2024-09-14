require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/user_roles");

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

const express =  require('express');
const app =  express();
app.use(express.json())
app.use(express.static('public'))

//authRoute
const authRoute= require('./routes/authRoute')
app.use('/api', authRoute)

//adminRoute
const adminRoute= require('./routes/adminRoute')
app.use('/api', adminRoute)

const post= process.env.SERVER_PORT || 3000

app.listen(post,()=>{
    console.log(`server is running on port ${post}`)
})
