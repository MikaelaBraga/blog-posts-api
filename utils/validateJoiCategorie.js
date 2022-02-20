const Joi = require('joi');

const categorieSchema = Joi.object({
  name: Joi.string().min(4).required(),
});

const validateJoiCategorie = (object) => {
  const { error } = categorieSchema.validate(object);

  if (error) throw error;
};

module.exports = { validateJoiCategorie };