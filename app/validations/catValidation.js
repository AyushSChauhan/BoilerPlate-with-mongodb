const Joi = require("@hapi/joi");

function catValidate(req) {
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "any.required": `email is a required field`,
      })
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
  }

  module.exports = {
    catValidate
  }