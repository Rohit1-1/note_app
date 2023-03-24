const mongoose=require('mongoose');

const notesSchema=mongoose.Schema({   
    title:String,
    description:String,
    userId:String
})

const Notes_Model=mongoose.model('note',notesSchema)

module.exports={Notes_Model}