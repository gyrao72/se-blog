const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    upvote:{
        type:Schema.Types.ObjectId,
        ref:'Upvote'
    },
    createdAt:{
        type : Date, 
        default : Date.now
    }
});

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;