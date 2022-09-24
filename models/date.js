const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema({
    title: String,
    date: String,
    time: String
});

module.exports = mongoose.model("Date", DateSchema);