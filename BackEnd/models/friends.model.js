// const mongoose = require("mongoose")
// const validator = require("validator")

// const friendSchema = mongoose.Schema({
//     userID:{type: mongoose.Schema.Types.ObjectId, ref: "Users" , required:true},
//     name:{type:String,required:true,trim:true},
//     email:{type:String, trim:true, required:[true, "Please Enter Email!"], unique:[true, "Email is used before"], validate(value){if(!validator.isEmail(value)) throw new Error("Invaild Email..!")}, lowercase:true},
//     birthDate:{type:Date, required:true},
//     gender: {type:String, required:true, trim:true}
// })

// const Friend = mongoose.model("friends", friendSchema)
// module.exports = Friend