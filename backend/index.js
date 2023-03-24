const express=require('express');
const cors=require("cors");
const {connection}=require('./config/db')
const {signupRouter}=require('./router/signup_router')
const {loginRouter}=require('./router/login_router')
const app=express();


app.use(cors())
app.use(express.json());
app.use("/signup",signupRouter)
app.use("/login",loginRouter)


app.get('/',(req,res)=>{
try {
    res.send({"msg":"HomePage"})
} catch (error) {
    
}
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log("server started on port 8080")
    } catch (err) {
        console.log(err);
    }
})