const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

const jwtConfig = { algorithms: ['HS256'] };

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { email } = jwt.verify(token, JWT_SECRET, jwtConfig);

    const user = await userService.getUserByEmail(email);
    // console.log(user);

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};