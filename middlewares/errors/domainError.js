const errorMap = {
  conflicts: 409,
  invalidFields: 400,
  notFound: 404,
};

module.exports = (err, req, res, next) => {
  if (!err.message) return next(err);

  return res.status(errorMap[err.code]).json({ message: err.message });
};