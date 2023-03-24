require("dotenv").config()
const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
       
        var decoded = jwt.verify(token,process.env.KEY);
        
        if(decoded){
            req.body.userId=decoded.userId
            next()
        }
        else{
            res.status(401).send({"msg":"Not authorised"})
        }
      
       
    } catch (error) {
        res.status(500).send({"msg":"something went wrong or missing token",})
    }
   
}

module.exports={authenticate}