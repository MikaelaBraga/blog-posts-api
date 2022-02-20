const router = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');
const { validateWithJoi } = require('../utils/validateWithJoi');
const authentication = require('../middlewares/auth');

router.post('/', rescue(async (req, res) => {
  validateWithJoi(req.body);

  const tokenUser = await userService.createUser(req.body);
  
  return res.status(201).json({ token: tokenUser });
}));

router.get('/', authentication, rescue(async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
}));

module.exports = router;