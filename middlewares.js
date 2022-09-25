const ExpressError = require("./utilities/ExpressError");
const { dateSchema } = require("./schemas");

module.exports.validateEntry = (req, res, next) => {
    const { error } = dateSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(",");
        req.flash("error", msg);
        return res.redirect("/");
    } else {
        next();
    };
};

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) { // isAuthenticated is a passport method that checks if the user is logged in or not
        req.flash("error", "You must be signed in");
        return res.redirect("/login");
    };
    next();
};