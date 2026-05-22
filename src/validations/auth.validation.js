const Joi = require("joi");

const registerValidation = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
});

const verifyOtpValidation = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),

  name: Joi.string()
    .min(3)
    .max(50)
    .optional()
});

module.exports = {
  registerValidation,
  verifyOtpValidation
};