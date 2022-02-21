const jwt = require('../utils/jwt');
const { User } = require('../models');
const errorConstructor = require('../utils/errorConstructor');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) throw errorConstructor('conflicts', 'User already registered');

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ email });

  return token;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user.dataValues;
};

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw errorConstructor('notFound', 'User does not exist');

  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById };
