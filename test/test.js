const express = require("express");
const app = express();
const session = require("express-session");
// const cookieParser = require('cookie-parser')

// app.use(cookieParser())
// app.use(cookieParser("secretcode"))
app.use(session({secret:"mysupersecretstrings",resave:false, saveUninitialized:true}))

// app.get("/sendcookie" , (req,res)=>{
//     res.cookie("made-in", "india" , {signed:true});
//     res.send("signed cookie sent");
// })

// app.get("/test", (req,res)=>{
//     res.send("sucess")
// })

app.get("/count", (req,res)=>{
    if(req.session.count){
       req.session.count++;
    }else{
       req.session.count = 1
    }
    res.send(`your cout is ${req.session.count} time now`);
})

// app.get("/verify", (req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verify");
// })
// app.get("/getcookie", (req,res)=>{
//     res.cookie("greet", "good night")
//     res.send("helo tahir");
// })

// app.get("/greet", (req,res)=>{
//     let {name = "tahir"} = req.cookies;
//     res.send(`hi ${name}`)
// })
// app.get("/", (req,res)=>{
//     console.dir(req.cookies)
//     res.send("hi i am tahir");
// })

app.listen(9000,()=>{
    console.log("server is on 9000")
})