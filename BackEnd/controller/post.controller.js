const postModel = require("../models/posts.model")

class Post {

    //Option only for (Users) to add new post
    static addPost = async(req, res)=>{
        try{
            const newPost = await new postModel({
                ...req.body,
                userID: req.user._id
            })
            newPost.save()
            res.status(200).send({
                APIstatus: true,
                message: "Post added successfully!",
            })
        }
        catch(e){
            res.status(500).send({APIstatus: false, message: e.message})
        }
    }

    //Option only for (Users) to show his own posts
    static showUserPosts = async(req,res)=>{
        try{
            await req.user.populate({
                path:"userPosts",
                // option:[]
            })
            if(req.user.userPosts.length == 0) throw new Error("No post to Show")
            res.status(200).send({
                APIstatus: true,
                data:req.user.userPosts,
                message: "Post Error successfully!"
            })
        }
        catch(e){
            res.status(500).send({APIstatus: false, message: e.message})
        }
    }

    //Option for only (Users) to delete "one" of his posts
    static deletePost = async(req, res)=>{
        try{
            const targetPost = await postModel.findByIdAndDelete(req.params.id)
            if(!targetPost) throw new Error("Can't find post to delete...!")
            res.status(200).send({
                APIstatus:true,
                message: "Deleted Successfully"
            })
        }
        catch(e){
            res.send({
                APIstatus:false,
                message: e.message
            })
        }
    }

    //Option for only (Users) to delete all of his posts
    static deleteAllPosts = async(req, res)=>{
        try{
            await postModel.deleteMany()
            res.status(200).send({
                APIstatus:true,
                message: "Deleted successfully"
            })
        }
        catch(e){
            res.status(500).send({
                APIstatus: false,
                message: e.message
            })
        }
        
    }
}


module.exports = Post