const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema({
    title: String,
    date: String,
    time: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Date", DateSchema);