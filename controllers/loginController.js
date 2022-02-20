const routerPost = require('express').Router();
const rescue = require('express-rescue');
const { createLogin } = require('../services/loginService');
const { validateJoiLogin } = require('../utils/validateJoiLogin');

routerPost.post('/', rescue(async (req, res) => {
  validateJoiLogin(req.body);
  const { email } = req.body;

  const tokenLogin = await createLogin(email);
  
  return res.status(200).json({ token: tokenLogin });
}));

module.exports = routerPost;