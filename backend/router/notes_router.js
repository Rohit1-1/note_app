const {Router}=require("express")
const {Notes_Model}=require("../model/Notes_Model")
const {authenticate}=require("../middlewares/authenticate")

const notesRouter=Router()

// Get Note
notesRouter.get("/",authenticate,async(req,res)=>{
    let {userId}=req.body
   try {
    let notes=await Notes_Model.find({userId})
      res.status(200).send({"notes":notes})

   } catch (error) {
    console.log(error);
    res.status(500).send({"msg":"something went wrong"})
   }
})


// Note create 
notesRouter.post("/",authenticate,async(req,res)=>{
    const {title,description,userId}=req.body;
    try {
        if(title&&description){
            let note = new Notes_Model({title,description,userId})
            await note.save();
            res.status(201).send({"msg":"note created successfully","status":true})
        }
        else{
            res.status(400).send({"msg":"add all the required fields","status":false})
        }
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong","status":false})
    }
})

// Update Note

notesRouter.patch("/:id",authenticate,async(req,res)=>{
    let payload=req.body;
    let _id=req.params.id
    let userId=req.body.userId
    console.log(payload,_id,userId);
    try {

      await Notes_Model.findOneAndUpdate({_id,userId},payload)

    res.status(200).send({"msg":"updated successfully","update_status":true})

    } catch (error) {

        res.status(500).send({"msg":"something went wrong","update_status":false})
    }
})

// Delete Note

notesRouter.delete("/:id",authenticate,async(req,res)=>{
    let _id=req.params.id
    let userId=req.body.userId

    try {
        await Notes_Model.findOneAndDelete({_id,userId})
        res.status(204).send()

    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong","deleted":false})
    }
})

module.exports={notesRouter}