const Joi = require('joi');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validateJoiBlogPost = (object) => {
  const { error } = blogPostSchema.validate(object);

  if (error) throw error;
};

module.exports = { validateJoiBlogPost };