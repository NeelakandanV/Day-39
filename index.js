const fs = require("fs")
const express = require("express")
const path = require("path");
const PORT = 9000;

const app = express();

app.use(express.static("timestamp"))

app.get("/static",(req,res)=>{
    const date = new Date()
    const time = date.toUTCString()
    const curr_time = time.slice(17,-3).split(":").join("-")
    const curr_date = time.slice(5,-13).split(" ").join("")
    const fileName = `${curr_date}_${curr_time}`
    const filePath = path.join(__dirname,"timestamp",`${fileName}.txt`)


    const content = `Last updated timestamp --  ${time}`

    fs.writeFileSync(filePath,content,(err)=>{
        if(err){
            console.log(err)
        }
    })
    res.sendFile(filePath)
});

app.get("/gettime",(req,res)=>{
    fs.readdir("./timestamp",(err,data)=>{
        if(err){
            console.log(err)
        }else{
           res.send(data)
        }
    })
})

app.listen(PORT,()=>console.log("works fine"))