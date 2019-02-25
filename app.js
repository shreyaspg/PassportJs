var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/users"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

var app = express();

mongoose.connect("mongodb://localhost:27017/auth",{ useNewUrlParser: true });
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "hola",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",function(req,res){
    res.render("secret");
});


app.listen(process.env.PORT,process.env.Ip,function(){
    console.log("Server started at......."+process.env.PORT);
});