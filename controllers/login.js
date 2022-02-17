const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
    }
    
    const user = User.finOne({ where: { username } });
    const { JWT_SECRET } = process.env;
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
    
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};