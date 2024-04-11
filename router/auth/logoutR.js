const express=require('express')
const {auth}=require('../../middleware/auth')
const logout=async(req,res)=>{
    try{
        const options={
            expires:new Date(Date.now(0)),
            httpOnly:true,
            sameSite: 'none',
        secure:true
        }
        res.status(201).cookie('token',null,options).json({
            success:true,
            message:"Logout Successfully",
        })
    }catch(err){
            res.status(500).json({ message: err });
        
    }
}

const router=express.Router();
router.route('/logout').get(auth,logout);
module.exports=router;