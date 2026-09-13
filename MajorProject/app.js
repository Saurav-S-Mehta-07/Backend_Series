const express = require("express")
const app = express()
const PORT = 8080
const path = require("path")
const methodOverride = require("method-override")
const mongoose =  require("mongoose")
const ejsMate = require("ejs-mate")

const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")

const possport = require("passport");
const LocalStretegy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)

const ExpressError = require("./utils/ExpressError.js")

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter =  require("./routes/user.js");

const passport = require("passport")

// connection to DB
const mongodb_url = 'mongodb://127.0.0.1:27017/explora'
main()
.then(()=>console.log("Connected to MongoDB Successfully!"))
.catch((err)=>console.log("Error : ", err))
async function main() {
    await mongoose.connect(mongodb_url)
}


// session 
const sessionOptions = {
    secret : "mysupersecretkey",
    resave:false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly : true
    }
};

app.use(session(sessionOptions));
app.use(cookieParser())
app.use(flash())


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStretegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// our Routes
app.get("/",(req,res)=>{
    res.redirect("/listings")
})

app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email : "demo@gmail.com",
        username : "demo"
    });

    let registeredUser = await User.register(fakeUser, "mypassword");
    res.send(registeredUser);
})

// routes
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter)
app.use("/", userRouter)

app.use((req,res,next)=>{
    next(new ExpressError(404, "Page not Found"))
})

app.use((err,req,res,next)=>{
    let {status = 500, message = "something went wrong"} = err
    res.status(status).render("error.ejs",{err});
})

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
})