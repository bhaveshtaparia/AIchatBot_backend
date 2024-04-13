const express=require('express');
const cors=require('cors')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const app=express();
const fileUpload = require('express-fileupload');
const Signup=require('./router/auth/signupR')
const Login=require('./router/auth/loginR')
const Logout=require('./router/auth/logoutR')
const Chat=require('./router/chat/chatUploderR');
const ChatWithUs=require('./router/chat/chatWithUsR');
const DoubtAssistant=require('./router/chat/doubtAssistanceR');
const Feedback=require('./router/chat/feedbackR');
const Sales=require('./router/chat/SalesTeamR');
app.use(cookieParser());
const dbconnection=require('./server');
dotenv.config({path:'./config.env'});
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(fileUpload());
dbconnection();
app.get('/',(req,res)=>{
    res.send("working")
})
app.use(cors({
    origin:"http://localhost:3000" ||  process.env.WEBLINK,
    credentials: true,
    methods:["GET","POST","DELETE","PUT"]
}));
app.use('/api/v1',Signup);
app.use('/api/v1',Login);
app.use('/api/v1',Logout);
app.use('/api/v1',Chat);
app.use('/api/v1',ChatWithUs);
app.use('/api/v1',DoubtAssistant);
app.use('/api/v1',Feedback);
app.use('/api/v1',Sales);
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
    console.log(`server is working on ${process.env.PORT} `)
})