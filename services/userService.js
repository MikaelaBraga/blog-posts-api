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

module.exports = { createUser };
