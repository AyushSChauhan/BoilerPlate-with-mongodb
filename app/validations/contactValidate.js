const Joi = require("@hapi/joi");

function contactValidate(req) {
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
        "string.base": `name should be a type of 'text'`,
        "string.empty": `name cannot be an empty field`,
        "any.required": `name is a required field`,
      }),
      email: Joi.string().required().empty().email().messages({
        "string.base": `Email should be a type of 'text'`,
        "string.empty": `Email cannot be an empty field`,
        "string.email": `Email format not valid`,
        "any.required": `Email is a required field`,
      }),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        "number.empty": `Phone cannot be an empty field`,
        "number.min": "Phone must be 10 digit",
        "number.max": "Phone can't be greater than 10 digit",
        "any.required": `Phone is a required field`,
      }),
      message: Joi.string().required().empty().messages({
        "string.base": `Message should be a type of 'text'`,
        "string.empty": `Message cannot be an empty field`,
        "any.required": `Message is a required field`,
      }),
      date: Joi.date().required().messages({
        "any.required": `date is a required field`,
      })
    });
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
  }

  module.exports = {
    contactValidate
  }