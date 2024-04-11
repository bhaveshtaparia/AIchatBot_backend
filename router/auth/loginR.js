const express =require('express')
const bcrypt=require('bcryptjs')
const User=require('../../model/signupModel');  
const jwt =require('jsonwebtoken')
const loginFunction=async(req,res)=>{
try{

const user =await User.findOne({email:req.body.email});

if(user && await bcrypt.compare(req.body.password,user.password)){
   
    const payload={
        userId:user._id
    }
   
    const token=jwt.sign(payload,process.env.SECRETKEY)
    
    const options={
        expires:new Date(Date.now()+process.env.EXPIREC*24*60*60*1000),
        httpOnly:true,
    }
    res.status(201).cookie('token',token,options).json({
        message:"login successfully",
         token,
        user
    })
  
}else{
    res.status(404).json({
        message:"user email and password was incorrect",
        success:false
    })
}

}catch(err){
    res.status(500).json({
        message:"server err or email or password was incorrect",
        err
    })
}
}

const router=express.Router();
router.route('/login').post(loginFunction);
module.exports=router;