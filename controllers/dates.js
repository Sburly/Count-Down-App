const DateDB = require("../models/date");

module.exports.renderHome = async (req, res) => {
    const dates = await DateDB.find({ author: req.user._id });
    res.render("home", { dates });
};

module.exports.createEntry = async (req, res) => {
    if(!req.body.time) req.body.time = "00:00";
    const date = new DateDB(req.body);
    date.author = req.user._id;
    await date.save();
    req.flash("success", "You've succesfully created a new entry!");
    res.redirect("/");
};

module.exports.updateEntry = async (req, res) => {
    const { id } = req.params;
    await DateDB.findByIdAndUpdate(id, {...req.body}, { new: true });
    res.redirect("/");
};

module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    await DateDB.findByIdAndDelete(id);
    res.redirect("/");
};