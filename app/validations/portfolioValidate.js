const Joi = require('joi');



function portfolioValidate(req) {
    const schema = Joi.object({
        catagory: Joi.string().required().empty().messages({
            "string.base": `Project Category should be a type of 'text'`,
            "string.empty": `Project Category  cannot be an empty field`,
            "any.required": `Project Category  is a required field`,
        }),
        name: Joi.string().required().empty().messages({
            "string.base": `Project Name should be a type of 'text'`,
            "string.empty": `Project Name cannot be an empty field`,
            "any.required": `Project Name is a required field`,
        }),
        title: Joi.string().required().empty().messages({
            "string.base": `Project Title should be a type of 'text'`,
            "string.empty": `Project Title cannot be an empty field`,
            "any.required": `Project Title is a required field`,
        }),
        date: Joi.date().required().messages({
            "any.required": `date is a required field`,
        }),
        url : Joi.string().required().empty().messages({
            "string.base": `URL should be a type of 'text'`,
            "string.empty": `URL cannot be an empty field`,
            "any.required": `URL is a required field`,
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
    portfolioValidate
  }