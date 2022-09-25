// Requirements
if (process.env.NODE_ENV !== "production") require("dotenv").config(); // When the app is in development mode we want to use the .env file for our secret keys, otherwise we will use the hosting environment.
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
// Imports
const DateDB = require("./models/date");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");
const { validateEntry } = require("./middlewares");

// Express App Settings
const app = express(); // Creating the app
let port = 3000; // Setting the app port
app.set('view engine', 'ejs');
app.engine("ejs", ejsMate);
app.set('views', path.join(__dirname, 'views')); // Setting the views directory
app.use(express.static(path.join(__dirname, 'static'))); // Setting the static directory
app.use(express.urlencoded({ extended: true })); // Encoding datas
app.use(methodOverride("_method")); // Using method-override to have access to other routes verbs from ejs files

// Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));
// Mongo Session
const store = MongoDBStore.create({
    mongoUrl: process.env.MONGODB_URI,
    secret: process.env.SECRET_KEY,
    touchAfter: 24 * 3600 // once every 24h if there are no udates, will autosave the session
});
store.on("error", function(){
    console.log("Store error", e);
});
const sessionConfig = {
    store,
    name: "session",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (1000 * 360 * 24 * 7), // I have to fist get the date, and then tell it to expire in one week from now (in milliseconds);
        maxAge: Date.now() + (1000 * 360 * 24 * 7),
        httpOnly: true, // we dont let thrid parties access cookies
        // secure: true When we deply our app we want this, but in development mode it breaks everything because it doesn't let you log in with local host because it's not secured
    }
};
app.use(session(sessionConfig));

// Flash Messages
app.use(flash());

// Home Page
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", catchAsync(async (req, res) => {
    const dates = await DateDB.find({});
    res.render("home", { dates });
}));

app.post("/", validateEntry, catchAsync(async (req, res) => {
    if(!req.body.time) req.body.time = "00:00";
    const date = new DateDB(req.body);
    await date.save();
    req.flash("success", "You've succesfully created a new entry!");
    res.redirect("/");
}));

app.put("/:id", validateEntry, catchAsync(async (req, res) => {
    const { id } = req.params;
    const date = await DateDB.findByIdAndUpdate(id, {...req.body}, { new: true });
    res.redirect("/");
}));

app.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await DateDB.findByIdAndDelete(id);
    res.redirect("/");
}));

app.all("*", (req, res, next) => { // Whenever a route doen't exist we call this route
    next(new ExpressError("Page Not found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no! Something went wrong";
    res.status(statusCode).render("error", { err });
});

// App Listening
app.listen(port, () => {
    console.log("http://localhost:" + port);
});