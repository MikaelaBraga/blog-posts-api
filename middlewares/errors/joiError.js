const Joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!Joi.isError(err)) return next(err);

  if (err.message === '"displayName" is required'
  || err.message === '"email" is required'
  || err.message === '"password" is required') {
    return res.status(400).json({ message: err.message });
  }

  return res.status(409).json({ message: err.message });
};