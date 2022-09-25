const Joi = require("joi");

module.exports.dateSchema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().optional()
});