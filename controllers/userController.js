const router = require('express').Router();
const rescue = require('express-rescue');
const { User } = require('../models');
// const Joi = require('joi');

router.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await User.create({ displayName, email, password, image });
  
  return res.status(201).json({ message: 'Token aqui' });
}));

module.exports = router;