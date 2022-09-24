const BaseJoi = require("joi"); // We require Joi
const JoiDate = require('joi-date-extensions');
const sanitizeHtml = require('sanitize-html'); // We require sanitize-html

const extension = (joi) => ({ // This function allows us to stop hacker attacks that want to inject html or js into our code
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension, JoiDate);

module.exports.dateSchema = Joi.object({
    date: Joi.object({
        title: Joi.string().required().escapeHTML(),
        date: Joi.date().format('YYYY-MM-DD HH:mm:ss').required().escapeHTML()
    }).required()
});