const Joi = require("joi");

const amountValidation = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
});

module.exports = {
  amountValidation
};