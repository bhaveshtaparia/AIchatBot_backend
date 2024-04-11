const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const singupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[7,"password should containe atleast 7 char"]
    },
    role:{
      type:String,
      default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
singupSchema.post('save', function(error, doc, next) {
  
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Email already exists'));
    }
    else if(error.name==='ValidationError'){
    next(new Error(error.message));
    } 
    else {
      next(error);
    }
  });
  singupSchema.pre('save',async function(next){
    try{
     
    if(!this.isModified('password')){
        return next();
    }
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    // this.cpassword=hash;
    next();

    }catch(error){
        next(error)
    }
  })
module.exports=new mongoose.model('register',singupSchema);