const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express()

mongoose.connect("mongodb://127.0.0.1:27017/test",{
    useNewUrlParser:true,    
    useUnifiedTopology:true
    })


const postSchema= new mongoose.Schema({
      id: String,
      employee_name:String, 
     employee_salary: Number,
      employee_age: Number
})
const students= mongoose.model("student",postSchema)


app.use(cors());
app.use(express.json());


app.get("/students", async (req,res)=>{
    const PAGE_SIZE=5;
    const page=parseInt(req.query.page|| "0") ;
    // console.log(res)
    const total =await students.countDocuments({})
    const posts= await students.find({}).limit(PAGE_SIZE)
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE*page);
    res.json( {totalPages:Math.ceil(total/ PAGE_SIZE)
        ,posts})
    // console.log(posts)
})


// const db =mongoose.connection;


// db.once("open",()=>{
    app.listen(4000);
// })