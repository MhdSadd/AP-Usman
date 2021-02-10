//Bring in dependencies/Modules
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const notifier = require('node-notifier');
const {DateTime} = require('luxon')
const {Comment} = require('./models/comment');
require("./config/passport")(passport);


// Define express function
const app = express();
const PORT = 7800;

// Configure logger
app.use(logger('dev'));

// Configure mongoose to connect to database
mongoose.connect("mongodb://localhost/apusmanfoundation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response) => {
    console.log("AP Usman Foundation database connected successfully");
}).catch((error) => {
    console.log(error);
});


//Configure EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Configuring Express App 
app.use(express.static(path.join(__dirname, 'public')));

//Cookie setup
app.use(cookieParser());

// bodyParser init
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup Flash and Session
app.use(session({
    secret: 'djnf;fhurhw8r42080ef,;;dfhdd;;BFIFHjfjBHFDFJMIR8;MF',
    saveUninitialized: false, //If set to true, this session will be saved 
    // on the server on each request no matter if something is changed or not.
    resave: false,
    cookie: { maxAge: Date.now() + 3600000 }
}));

//passport middleware config
app.use(passport.initialize());
app.use(passport.session());



app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('errror')
    res.locals.messages = require("express-messages")(req, res);    
    res.locals.comment = req.message
    res.locals.user = req.user || null;
    next()
});





//Routes grouping
const index = require("./routes/index");
const admin = require('./routes/adminRoutes')
const comments = require('./routes/commentsRoutes')

app.use("/", index)
app.use("/comments", comments)
app.use('/admin', admin)
// app.get("/", async (req, res) => {
//     const comments  = await Comment.find();
//     console.log(comments);
//     // res.send("This is the homepage!!!!!!");
//     res.render("index.ejs", {comments:comments});
// }); 

app.post('/comment', (req, res, err) => {
    let {name, email, message} = req.body
    let errors = []

    if (!message) {
        errors.push({ msg: "please enter a message to comment" })
    }

    if (errors.length > 0) {
        res.render("#contact", {
            errors,
            name,
            email,
            message,
        })

    } else {
        const current_year = new Date().getFullYear();
        const local_date = `${DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })} ${current_year}`
        let comment_date;
        comment_date = local_date
        short_message = message.slice(0, 100) 
        console.log(short_message)
        const newComment = new Comment({
            name,
            email,
            message,
            short_message,
            comment_date
        });

        newComment.save()
        notifier.notify('Comment Sent successfully')
        res.redirect('/')
    }


});


app.listen(PORT, () => {
    console.log(`Server started on port:::: ${PORT}`)
});