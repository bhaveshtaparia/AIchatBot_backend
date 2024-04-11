const mongoose=require('mongoose');
const dbconnection=()=>{
    mongoose.connect(process.env.DBURI,{ 
    autoIndex: true, }).then(
        console.log("connection with database created succesfully")
   )
}
module.exports=dbconnection;