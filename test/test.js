const express = require("express");
const app = express();
const session = require("express-session");
// const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const path = require("path");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// app.use(cookieParser())
// app.use(cookieParser("secretcode"))
const sessionOption = {
    secret:"mysupersecretstrings",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionOption));
app.use(flash())
// app.get("/sendcookie" , (req,res)=>{
//     res.cookie("made-in", "india" , {signed:true});
//     res.send("signed cookie sent");
// })

// app.get("/test", (req,res)=>{
//     res.send("sucess")
// })

app.use((req,res,next)=>{
   res.locals.MsgSuccess = req.flash('info');
   res.locals.MsgError = req.flash("error");
   next();
})

app.get("/register", (req,res)=>{
    let {name = "non"} = req.query;
    req.session.name = name;
    if(name === "non"){
        req.flash('error', 'Opps Something went wrong!')
    }else{
        req.flash('info', 'Login successfull!')
    }
    res.redirect("/hello")
})

app.get("/hello", (req,res)=>{
    // res.send(`Hello ${req.session.name || "Guest"}`);
    res.render("page.ejs", {name: req.session.name })
});


// app.get("/count", (req,res)=>{
//     if(req.session.count){
//        req.session.count++;
//     }else{
//        req.session.count = 1
//     }
//     res.send(`your cout is ${req.session.count} time now`);
// })

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