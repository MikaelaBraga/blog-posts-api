const router = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');
const { validateWithJoi } = require('../utils/validateJoiUser');
const auth = require('../middlewares/auth');

router.post('/', rescue(async (req, res) => {
  validateWithJoi(req.body);

  const tokenUser = await userService.createUser(req.body);
  
  return res.status(201).json({ token: tokenUser });
}));

router.get('/', auth, rescue(async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
}));

router.get('/:id', auth, rescue(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return res.status(200).json(user);
}));

router.delete('/me', auth, rescue(async (req, res) => {
  const userLogged = req.user;
  await userService.deleteUser(userLogged);

  return res.status(204).json();
}));

module.exports = router;