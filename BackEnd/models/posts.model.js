const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users" ,
        required:true
    },

    content:{
        type:String, 
        required:true
    } // file:{} 
})

const Post = mongoose.model("Posts",postSchema)
module.exports = Post