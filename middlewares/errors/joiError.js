const Joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!Joi.isError(err)) return next(err);

  return res.status(400).json({ message: err.message });
};