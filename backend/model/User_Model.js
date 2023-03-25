const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User_Model=mongoose.model('noteuser',userSchema)

module.exports={User_Model}