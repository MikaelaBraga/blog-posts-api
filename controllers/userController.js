const router = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');
const { validateWithJoi } = require('../utils/validateWithJoi');

router.post('/', rescue(async (req, res) => {
  validateWithJoi(req.body);

  const tokenUser = await userService.createUser(req.body);
  
  return res.status(201).json({ message: tokenUser });
}));

module.exports = router;