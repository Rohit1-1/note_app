const {Router}=require("express")
const bcrypt = require('bcrypt')
const {User_Model}=require('../model/User_Model')
const signupRouter=Router();

signupRouter.post('/',async(req,res)=>{
    const {name,email,password}=req.body;
   // console.log("true",req.body,name);
    try {
    
        if(name&&email&&password){
            console.log("true",req.body,name);
          let finduser=await User_Model.find({email})
          // Checkign if user already exist 
          if(finduser.length>0){
            console.log("exist");
            res.status(400).send({"msg":"email already exist","signup":false, "userExist":true})
          }

          else{
  
            bcrypt.hash(password, 6, async function(err, hash) {
              // Store hash in your password DB.
            if(hash){
              const user=new User_Model({name,email,password:hash})
              await user.save()
              res.status(201).send({"msg":"Signup successful", "signup":true, "userExist":false});
            }
            else if(err){
              res.status(500).send({"msg":"something went wrong","signup":false,"userExist":false})
            }
          });
          }
           
        }
        else{
            res.status(500).send({"msg":"something went wrong","signup":false,"userExist":false})
        }
    } catch (error) {
        res.status(500).send({"msg":"something went wrong","signup":false,"userExist":false})
        console.log(error)
    }
   
   
})

module.exports={signupRouter}