const { dateSchema } = require("./schemas");
const ExpressError = require("./utilities/ExpressError");

module.exports.validateDate = (req, res, next) => { // If the date is not validate following the joi schema that we defined, an Express Error will be thrown
    const { error } = dateSchema.validate(req.body);
    if(error) {
        const errorMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(errorMsg, 400);
    } else {
        next();
    };
};