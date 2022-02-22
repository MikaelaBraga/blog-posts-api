const Joi = require('joi');

const blogPostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

const validateBlogPostUpdated = (object) => {
  const { error } = blogPostSchema.validate(object);

  if (error) throw error;
};

module.exports = { validateBlogPostUpdated };