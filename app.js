// Requirements
if (process.env.NODE_ENV !== "production") require("dotenv").config(); // When the app is in development mode we want to use the .env file for our secret keys, otherwise we will use the hosting environment.
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// Imports
const Date = require("./models/date");

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

// Home Page
app.get("/", async (req, res) => {
    const dates = await Date.find({});
    res.render("home", { dates });
});

app.post("/", async (req, res) => {
    if(!req.body.time) req.body.time = "00:00";
    const date = new Date(req.body);
    await date.save();
    res.redirect("/");
});

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const date = await Date.findByIdAndUpdate(id, {...req.body}, { new: true });
    res.redirect("/");
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Date.findByIdAndDelete(id);
    res.redirect("/");
});

// App Listening
app.listen(port, () => {
    console.log("http://localhost:" + port);
});