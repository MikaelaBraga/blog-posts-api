const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().min(10).required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const validateJoiLogin = (object) => {
  const { error } = loginSchema.validate(object);

  if (error) throw error;
};

module.exports = { validateJoiLogin };