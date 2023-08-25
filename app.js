const express= require("express")
const app=express()
const cors=require("cors")
const cloudinary=require("cloudinary")
const fileupload=require("express-fileupload")
require('dotenv').config();



// This Guy works similar to URLencoded i.e; just for binding incoming files to req.body . Thats all his work
app.use(fileupload({
    useTempFiles:true
}))


app.use(cors())



// This will setup connection with cloudinary internally , dont overthink Chill XD
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


  
app.get("/",(req,res)=>{
    res.json({status:"ok"})
})

app.post("/upload",(req,res)=>{



    // Like we take req.body.VarName , here for files we get like req.files.FileName . Although it contains bunch of things 
    // including templFilePath

    const file=req.files.photo;

    // Here We are actually uploading file to cloudinary . This upload method takes first arg as img and
    //  second as callback which contains error and result as args . In result we will get our image URl if it successfully uploaded.

    cloudinary.v2.uploader.upload(file.tempFilePath,
 
  function(error, result)
   {
    console.log(result); 

   }
  
  );

    res.status(200).json({status:"uploaded"})
})


// Love you 3000 ... 
app.listen(3000,()=>{
    console.log("listening at 3000")
})