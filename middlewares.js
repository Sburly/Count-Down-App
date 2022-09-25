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